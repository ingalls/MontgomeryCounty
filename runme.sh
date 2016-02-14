#node index.js > /tmp/addr.ln

mkdir results || true
while read p; do
    NUM=$(echo "$p" | jq -r '.number')
    STR=$(echo "$p" | jq -r '.street')
    FILE=$(echo "${NUM}_${STR}" | tr ' ' '_')
    if [[ ! -e results/$FILE ]]; then
        echo "creating $FILE"
        echo "  casperjs scrape.js \"$NUM\" \"$STR\""
        casperjs scrape.js "$NUM" "$STR" > results/$FILE
        echo "    DONE"
    else
        echo "Skipping $FILE"
    fi
    sleep 4
done < /tmp/addr.ln
