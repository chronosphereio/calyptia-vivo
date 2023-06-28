package main

import (
	"io"
	"log"
	"net/http"
)

func copyHeader(dst, src http.Header) {
	for k, vv := range src {
		for _, v := range vv {
			dst.Add(k, v)
		}
	}
}

func notFound(w http.ResponseWriter) {
	w.WriteHeader(404)
	io.WriteString(w, "404 page not found")
}

func VivoListen(frontendStaticDir string, httpRootPath string) {
	fs := http.FileServer(http.Dir(frontendStaticDir))
	rootPath := httpRootPath + "/"
	if rootPath[0] != '/' {
		log.Printf(`WARN: root path "%s" doesn't start with "/". Prepending automatically`, rootPath)
		rootPath = "/" + rootPath
	}

	http.Handle(rootPath, fs)

	vivoBasePath := rootPath + "/vivo/"
	logsPath := vivoBasePath + "logs"
	metricsPath := vivoBasePath + "metrics"
	tracesPath := vivoBasePath + "traces"

	http.HandleFunc(vivoBasePath, func(w http.ResponseWriter, req *http.Request) {
		if req.Method != "GET" {
			notFound(w)
			return
		}

		switch req.URL.Path {
		case logsPath:
		case metricsPath:
		case tracesPath:
		default:
			notFound(w)
			return
		}

		client := &http.Client{}
		//http: Request.RequestURI can't be set in client requests.
		//http://golang.org/src/pkg/net/http/client.go
		req.RequestURI = ""
		req.Host = "127.0.0.1"
		req.URL.Host = "127.0.0.1:2025"
		req.URL.Scheme = "http"

		resp, err := client.Do(req)
		if err != nil {
			http.Error(w, "Server Error", http.StatusInternalServerError)
			log.Print("ServeHTTP:", err)
		}
		defer resp.Body.Close()
		copyHeader(w.Header(), resp.Header)
		w.WriteHeader(resp.StatusCode)
		io.Copy(w, resp.Body)
	})

	if err := http.ListenAndServe("0.0.0.0:3000", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
