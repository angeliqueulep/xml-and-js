# Assignment

1. Open `module-4/assignments/assignment.xml` in your editor
2. Create xsl file and add link to it ![image info](assets/step2.png)
3. Display catalog in the following way

- main title is "Catalog" ![image info](assets/step3a.png)
- use html list tag to display catalog ![image info](assets/step3b.png)
- render each item as `<article>` inside list item tag ![image info](assets/step3c.png)
- display product id as h3 ![image info](assets/step3d.png)
- display product description as paragraph ![image info](assets/step3e.png)
- render table of catalog items with columns: item number, price, gender, small, medium, large, extra large (if column item is not present in item, then display empty cell) ![image info](assets/step3f.png)
- for gender column render M for Men, W for Women ![image info](assets/step3g.png)
- inside size columns (small, medium, large, and extra large) display subtable with 2 columns: color and image ![image info](assets/step3h.png)

Thought Process:
In iterating inside the xml file, I used `xsl:for-each` to go through each product in the catalog and used list tag for each attribute. Since I am already in the product element, I have used another `xsl:for-each` to go through each catalog item. To implement a logic where certain text is to be displayed when it satisfies a condition, I used `xsl:choose` as it is similar to switch case functionality. Lastly, `xsl:if test` is used in testing a logic to determine if a subtable will be rendered in the cell. I added table borders to help separate the information in the table.

**Final Output**
![image info](assets/final.png)
