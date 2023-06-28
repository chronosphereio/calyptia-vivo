package main

import (
	"io"
	"log"
	"net/http"
	"path"
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

func vivoForward(w http.ResponseWriter, req *http.Request) {
	if req.Method != "GET" {
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
	req.URL.Path = "/" + path.Base(req.URL.Path)

	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Server Error", http.StatusInternalServerError)
		log.Print("ServeHTTP:", err)
	}
	defer resp.Body.Close()
	copyHeader(w.Header(), resp.Header)
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

func VivoListen(frontendStaticDir string, basePath string) {
	basePath += "/"
	fs := http.StripPrefix(basePath, http.FileServer(http.Dir(frontendStaticDir)))
	http.Handle(basePath, fs)
	http.HandleFunc(basePath+"logs", vivoForward)
	http.HandleFunc(basePath+"metrics", vivoForward)
	http.HandleFunc(basePath+"traces", vivoForward)

	log.Printf("Vivo proxy listening on base path %s", basePath)
	if err := http.ListenAndServe("0.0.0.0:3000", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
