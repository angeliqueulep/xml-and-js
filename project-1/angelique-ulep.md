# Team Contribution
The team decided to delegate the tasks equally. Ricardo got XML and DTD declaration, Amos got XSD and XSLT and I got HTML and JS. We were able to finish ahead of time because everyone were responsible enough and we made sure to finish our tasks on time since some tasks are dependent to each other.

# Individual Contribution
### Ricardo
He was responsible of creating the xml from the JSON file provided. He also added DTD for the said XML file.

### Amos
Given the XML file from Ricardo, Amos was in charge of creating XSD and XSLT to display these data.

### Angelique
I was in charge of creating the html file and js functions to be able to load the XML data and present it accordingly. I also created a css file for this html file for better presentation and styling.

In the HTML file, I created multiple functions in order to transform nested elements with more than 1 occurences (apps and employees). I converted them into arrays and for employees, I sorted them by department for a better looking table when displayed.

I've thought an array is necessary for me to be able to easily iterate through each element in a loop when displaying it into a table.

In order for me to be able to apply styling, I had to add classes on these elements by using the syntax `<element>.classList.add(<className>);`.
