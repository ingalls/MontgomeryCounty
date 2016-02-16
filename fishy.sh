
RESULTS=0
LISTS=0

echo ""
echo "Problematic Files"
for FILE in results/*; do
    OK=0

    if [[ $(grep -m1 -Eo "Account Identifier" $FILE | wc -l) > 0 ]]; then OK=1 && RESULTS=$(($RESULTS+1)); fi

    if [[ $(grep -m1 -Eo "ucSearchResult" $FILE | wc -l) > 0 ]]; then OK=1 && LISTS=$(($LISTS+1)); fi

    if [[ $OK != 1 ]]; then echo "- $FILE"; fi
done

echo ""
echo "Good Results: $RESULTS" 
echo "List Results: $LISTS" #Addresses with more than one account #
echo "-------------------"
echo "Total       : $(ls results/ | wc -l)"
