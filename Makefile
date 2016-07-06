test: ;@echo "Testing lichess-api....."; \
       ./node_modules/.bin/jshint --exclude ./node_modules && ./node_modules/.bin/mocha --harmony

.PHONY: test
