const logo = document.querySelectorAll("#logo path");

for(let i = 0; i < logo.length; i++) {
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}

// Creating a Bar Chart
const svg = d3.select('#barChart');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue = d => d.Patients;
    const yValue = d => d.Characteristic;
    const margin = {top: 50, right: 40, bottom: 70, left: 140};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight);

    g.append('g').call(d3.axisLeft(yScale));

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 50)
        .attr('x', innerWidth / 2)
        .attr('fill', 'white')
        .text('Patients')
    
    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());
    
    g. append('text')
        .attr('class', 'title')
        .attr('fill', 'white')
        .attr('y', -10)
        .text('Characteristics of 180 Patient-Physician Encounters')
};

d3.csv('patientPhysicianEncounters.csv').then(data => {
    data.forEach(d => {
        d.Patients = +d.Patients;
    });
    render(data);
});