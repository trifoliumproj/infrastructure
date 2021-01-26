cd "$(dirname $0)"

# Install Argo CD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl apply -k ./resources
kubens argocd
kubectl patch deployment argocd-server --patch-file=./resources/deploy.yaml
kubens default
