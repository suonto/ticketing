# Ticketing

## Prereqs
```
kubectl create secret generic jwt-secret --from-literal=jwt=kalapuikko
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
```

## Google Cloud Build
Gets "serviceaccount" credentials for my user. Used by services like cloud build that are used via service accounts.
```
gcloud auth application-default login
```
