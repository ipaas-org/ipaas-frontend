# HELP =================================================================================================================
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## Display this help screen
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

# run: fmt lint ### format, lint, check module and run go code
# 	go run .
# .PHONY: run

# fmt: ### format go mod and code
# 	go mod tidy 
# 	go fmt .
# .PHONY: fmt

# lint: ### check by golangci linter
# 	golangci-lint run
# .PHONY: linter-golangci

# test: ### run test
# 	go test ./controller/tests
# .PHONY: test

# testv: ### run verbose test
# 	go test -v ./controller/tests
# .PHONY: test

# update: ### update dependencies
# 	go mod tidy
# 	go get -u -v
# .PHONY: update

prod: ###fmt lint ### build docker image called image-builder
	docker build -t frontend -f prodDockerfile .
.PHONY: docker

dev:
	npm run dev
.PHONY: dev