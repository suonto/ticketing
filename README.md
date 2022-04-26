# Ticketing

## Prereqs
```
kubectl create secret generic jwt-secret --from-literal=jwt=kalapuikko
```

## Updating common
```
npm update @suontoticketing/common --save
```

## Run
```
skaffold dev
```

## Bypassing chrome cert issue
Type `thisisunsafe`.

## Google Cloud
```
gcloud auth login

# configure docker so that you can use push (, etc.) with gcr.io
gcloud auth configure-docker
```

## Google container registry
```

```

## Google Cloud Build
Gets "serviceaccount" credentials for my user. Used by services like cloud build that are used via service accounts.
```
gcloud auth application-default login
```


## Errors

#### failed to resolve the digest of gcr.io/ticketing-dev-347011/auth:7eac6e9: does the image exist remotely?

```
# No build, local digests
skaffold render --digest-source=tag

# build first, then from digest (takes long)
skaffold render --digest-source=local
```
