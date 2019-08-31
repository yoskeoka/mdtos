# table-converter

Markdown Table &lt;---> SpreadSheet Converter

[![Build Status](https://travis-ci.com/yoskeoka/table-converter.svg?branch=master)](https://travis-ci.com/yoskeoka/table-converter) [![Maintainability](https://api.codeclimate.com/v1/badges/d434f2ae8cad61dac87d/maintainability)](https://codeclimate.com/github/yoskeoka/table-converter/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d434f2ae8cad61dac87d/test_coverage)](https://codeclimate.com/github/yoskeoka/table-converter/test_coverage)

# Install

```sh:npm
npm i -g table-converter
```

```sh:yarn
yarn global add table-converter
```

# Usage

## Auto Convert between Markdown Table and SpreadSheet(tsv)

It tries read from `STDIN` first, then from Clipboard.

If `tconv` detects input table from `STDIN`, it writes the converted result on `STDOUT`.

If the input is from Clipboard, the result will be on Clipboard.

To suppress messages, use `-s` ( `--silent` ) option.

```sh
tconv
```

## Convert Markdown Table to SpreadSheet(tsv)

```sh
cat example.md | mdtoss
```

## Convert SpreadSheet(tsv) to Markdown

```sh
cat example.tsv | sstomd
```
