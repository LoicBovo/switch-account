# switch account



This is a node cli tool to switch between accounts



switch account has been created to address the issue of having multi accounts in aws. 

currently solution exists but they break aws cli which is not ideal



## pre-requisite

- aws cli installed and configured with default credentials of the main account
- you are capable of running an aws sts assume role command



## npm init

```bash
npm init
```





## build typesript 

```bash
npm run build
```



## install the npm tool

```bash
npm install -g .
```



## configure the tool



### add aws account 

```bash
switch-account add-product [productname]=[aws-role-arn]
```



### add mfa device

```bash
switch-account add-mfa [aws-mfa-device-arn]
```



## switch !

```bash
switch-account
```



## Copy paste the export

For now you will have to copy paste the result printed into the command line prompt


# todo

need to add yargs in order to better handle arguments passed to the console
__https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/__