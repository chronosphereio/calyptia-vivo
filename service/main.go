package main

import (
	"bufio"
        "bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"sync"
	"syscall"
	"time"
)

var (
	metricsBuffer string
	mu            sync.Mutex
)

type customWriter struct{}

func (cw *customWriter) Write(p []byte) (int, error) {
	coloredPrefix := "\033[1;34m[vivo:fluent-bit]\033[0m "
	scanner := bufio.NewScanner(bytes.NewReader(p))
	for scanner.Scan() {
		fmt.Println(coloredPrefix, scanner.Text())
	}
	return len(p), nil
}

func main() {
	// Set up the command to run Fluent Bit
	cmd := exec.Command("fluent-bit", "-c", "/app/fluent-bit.conf")

	// Redirect Fluent Bit's stderr to a custom writer
	cmd.Stderr = &customWriter{}

	// Start Fluent Bit
	err := cmd.Start()
	if err != nil {
		fmt.Printf("Error starting Fluent Bit: %v\n", err)
		return
	}
	fmt.Println("Fluent Bit started with process ID", cmd.Process.Pid)

	// Wait for Fluent Bit's HTTP endpoint to be alive
	if !waitForFluentBitHTTP("http://localhost:2020/api/v1/metrics", 15*time.Second) {
		fmt.Println("Failed to connect to Fluent Bit's HTTP endpoint, stopping the program")
		cmd.Process.Signal(syscall.SIGTERM)
		cmd.Wait()
		return
	}

	// Set up signal handling
	signalChan := make(chan os.Signal, 1)
	signal.Notify(signalChan, syscall.SIGINT, syscall.SIGTERM)

	// Wait for a signal
	<-signalChan
	fmt.Println("Received signal, terminating Fluent Bit...")

	// Send SIGTERM to Fluent Bit
	err = cmd.Process.Signal(syscall.SIGTERM)
	if err != nil {
		fmt.Printf("Error sending SIGTERM to Fluent Bit: %v\n", err)
	}

	// Wait for Fluent Bit to finish
	err = cmd.Wait()
	if err != nil {
		fmt.Printf("Fluent Bit exited with an error: %v\n", err)
	} else {
		fmt.Println("Fluent Bit exited successfully")
	}
}

func getFluentBitMetrics(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func metricsHandler(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()
	fmt.Fprint(w, metricsBuffer)
}

func waitForFluentBitHTTP(url string, timeout time.Duration) bool {
	start := time.Now()
	for {
		_, err := http.Get(url)
		if err == nil {
			return true
		}
		if time.Since(start) > timeout {
			return false
		}
		time.Sleep(500 * time.Millisecond)
	}
}


