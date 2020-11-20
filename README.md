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


### creat a new iam account 

The configuration follow
```
iam-account
    |
    |- mfa
    |
    |-aws-account
        |
        |-
```


```javascript
case "add-iam": // this is adding a new iam accounts
    AddIamAccount(config);
    break;
case "add-account": // this is adding a new aws account
    AddAccount(config);
    break;
case "set-default": // this is setting an iam account as default
    SetDefault();
    break;
default: // this is doing the magic
    Switch(config);
    break;
```