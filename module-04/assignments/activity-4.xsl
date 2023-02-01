<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <!-- Table 1-->
        <table>
          <tr>
            <th>Product name</th>
            <th>Manufacturer ID</th>
            <th>Description</th>
            <th>USD Price</th>
          </tr>

          <xsl:for-each select="products/product">
            <xsl:if test="@shippable = 'true'">
              <tr>
                <td><xsl:value-of select="productName" /></td>
                <td><xsl:value-of select="manufacturer/@id" /></td>
                <td><xsl:value-of select="description" /></td>
                <td><xsl:value-of select="prices/price[1]" /></td>
              </tr>
            </xsl:if>
          </xsl:for-each>
        </table>

        <!-- Table 2-->
        <table>
          <tr>
            <th>Product name</th>
            <th>Description</th>
            <th>USD Price</th>
            <th>Euro Price</th>
          </tr>

          <xsl:for-each select="products/product">
            <xsl:if test="manufacturer/@id = 'acme'">
              <tr>
                <td><xsl:value-of select="productName" /></td>
                <td><xsl:value-of select="description" /></td>
                <td><xsl:value-of select="prices/price[1]" /></td>
                <td><xsl:value-of select="prices/price[3]" /></td>
              </tr>
            </xsl:if>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>