1. react app compiled by webpack
2. webpack shld be only looking in src folder when compiling e app
3. believe it is also becos of webpack tt we are able to use `import...from...` even though there is no `type:modules` in package.json and we are using .js rather than .mjs files
4. think tt's why if attempt to place these smart contract info outside of src folder, will get error of module not found
