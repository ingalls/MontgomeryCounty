#node index.js > /tmp/addr.ln

mkdir results || true
while read p; do
    NUM=$(echo "$p" | jq -r '.number')
    STR=$(echo "$p" | jq -r '.street')
    FILE=$(echo "${NUM}_${STR}" | tr ' ' '_')
    if [[ ! -e results/$FILE ]]; then
        casperjs script.js
    fi
done < /tmp/addr.ln
