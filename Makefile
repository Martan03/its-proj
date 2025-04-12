login=xsleza26

.PHONY: submit
submit:
	zip $(login).zip *.feature README.md

.PHONY: clean
clean:
	rm $(login).zip
