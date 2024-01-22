// create a constant variable to hold the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Use d3.json() to fetch and parse JSON from a URL
d3.json(url).then(data => {
    // The 'data' variable now holds the parsed JSON
    console.log(data);
});

// Create a function that makes a horizonal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
function BarChart(test) {
    // Call the all the data
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        // Filter the data based on the sample id 
        let value_id = sample_data.filter(select => select.id == test);
        // Use the first entry in the dataset 
        let value_data = value_id[0];
        // Create varaibles for OTU values, OTU ids, OTU labels and log data
            let otu_ids = value_data.otu_ids;
            let otu_labels = value_data.otu_labels;
            let otu_values = value_data.sample_values;
                 console.log(otu_ids,otu_labels,otu_values);
        // Create bar graph elements with the top 10 OUTs found for the individual: 
            // otu_values as the values
            let xval = otu_values.slice(0,10).reverse();
            // otu_ids as the labels
            let yval = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
            // out_labels as the hovertext for the chart
            let labels = otu_labels.slice(0,10).reverse();
            // Set up the trace for the bar chart
            const trace = {
                x: xval,
                y: yval,
                text: labels,
                orientation: 'h', 
                type: 'bar'
            };
            // Data array 
            const bar_data = [trace]
            // Setup the layout
            const layout = {
                title: 'Top 10 OTUs', 
                xaxis: {title: 'OTU Values'},
                yaxis: {title: 'OTU IDs'}
            };
            // Configure
            const config = {responsive: true}
        // Call Plotly to plot the bar chart
        Plotly.newPlot('bar', bar_data, layout, config)
    });
};

// Create a function that makes a bubble chart that displays each sample
function BubbleChart(test) {
    // Call the all the data
    d3.json(url).then((data) => {
        let sample_data = data.samples;
        // Filter the data based on the sample id 
        let value_id = sample_data.filter(select => select.id == test);
        // Use the first entry in the dataset 
        let value_data = value_id[0];
        // Create varaibles for OTU values, OTU ids, OTU labels and log data
        let otu_ids = value_data.otu_ids;
        let otu_labels = value_data.otu_labels;
        let otu_values = value_data.sample_values;
            console.log(otu_ids,otu_labels,otu_values);  
        // Set up the trace for the bubble chart
        const trace2 = {
            x: otu_ids,
            y: otu_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: otu_values,
                color: otu_ids, 
                    colorscale: 'Earth'
            }
        };
        // Data array 
        const bubble_data = [trace2]
        // Set up the layout
        const layout = {
            title: 'Bacteria Per Sample',
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'OTU Values'}
        };
        // Configure
        const config = {responsive: true}
        // Call Plotly to plot the bubble chart
        Plotly.newPlot('bubble', bubble_data, layout, config)
    });
};

// Create a function that uses all the metadata information and displays it in a table
function Metadata(test) {
    // Call the all the data
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        // Filter and log the data based on the sample id 
        let value_id = metadata.filter(select => select.id == test);
            console.log(value_id);
        // Use the first entry in the dataset
        let demo = value_id[0];
        // Reset HTML sample id elememnt of metadata to an empty string
        d3.select('#sample-metadata').html('');
            // Iterate through the pairs (key and unique value_id)
            Object.entries(demo).forEach(([key,value_id]) => {
                // Log the individual pairs as they are being appended to the metadata 
                console.log(key,value_id);
                d3.select('#sample-metadata').append('h5').text(`${key}: ${value_id}`);
            });
    });
};

// Create a function that initializes at the belly button dashboard 
function dashboard() {
    // Select the test subject ID dropdown bar
    let testdropdown = d3.select('#selDataset');
    // Include specific logic for processing the data into the dropdown bar
    d3.json(url).then((data) => {
        // Create a new variable for the sample names
        let samp_names = data.names;
        // Add the sample names to the test subject id dropdown bar
        samp_names.forEach((id) => {
            console.log(id);
            testdropdown.append('option')
            .text(id)
            .property('value',id);
        });
        // For the inital dashboard we want to display the first sample from the list (ID NO. 940)
        let first_samp = samp_names[0];
            console.log(first_samp);
            // Build the initial plots
            BarChart(first_samp);
            BubbleChart(first_samp);
            Metadata(first_samp)
    });
};
// Call the function that opens the default belly button dashboard
dashboard();

// Function that updates dashboard when sample ID is changed
function optionChanged(value_id) { 
    console.log(value_id); 
    // Update the visualizations to match the selected sample ID
    BarChart(value_id);
    BubbleChart(value_id);
    Metadata(value_id)
};


