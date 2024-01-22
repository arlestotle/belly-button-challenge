# Module 14 - belly-button-challenge

### In this assignment, we were tasked to build an interactive dashnoard to explore the belly button biodiverity dataset which catalogs the microbes that colonize homan navels. The data set reveals that a samll handful of microbial species, also called operational taxonomic units (OTUs). The challenge required three visualizations: horizonatal bar chart, bubble chart, demographics table created from the metadata. 

## Horizontal Bar Chart 
### For each unique test sample, a bar chart was created to display the top 10 OTUs found in that individual. I choose to put the OTU values in descending order using the .reverse function, then called for the first 10 OTU IDs. The sample_values were used as the values for the bar chart, otu_ids as the labels, and otu_labels as the hover over text. 

## Bubble Chart 
### For the bubble chart, the otu_ids were used for the x values and marker colors, sample_values as the y values and the marker size, and otu_labels for the text values. The Earth color scale package was used. 

## Metadata Demographic Info
#### A function was created that displays the metadata demographic data on the webpage. The Object.entries() iterates through the key and value pairs and forEach helps perform a function that appends the metadata into the demographics chart.

## Start at the Dashboard
### A function was created which initializes at the belly button dashboard. The sample drop down menu was given a specific logic for processing the name of the selected sample and matched with the ID of the metadata, so when you click the dropdown menu you can change the sample ID. For the initial dashboard we want the default to display the bar chart, bubble chart, and demographic information of the first sample listed from the array, ID 940. 

## Changing the Sample
### Finally, a function was created the updates the dashboard when a sample is changed via the dropdown menu. When the sample ID is changed it updates the bar chart, bubbke chart, and demographic info to match the selected sample ID. 

## GitPages 
### https://arlestotle.github.io/belly-button-challenge/

### Outside Help
#### For this assignment, I used outside sources such as Stack Overflow and ChatGPT. 
##### 'let sample_id = data.filter(select => select.id == test);' to help filter the data based on the sample ID. 
##### 'otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();' to extract the first 10 elements of the otu_ids array and converts it to a string where the ID in reverse or descending order. 
##### 'Object.entries(valueData).forEach(([key,value_id]) => {d3.select('#sample-metadata').append('h5').text(`${key}: ${value_id}`);});' which returns an array of a given pair in this case key and value_id and the iterates through each pair and appends the values into the demographic info table. 

