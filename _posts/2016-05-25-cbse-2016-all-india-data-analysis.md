---
id: 59
title: 'CBSE 2016 Board Result All India Data Analysis'
date: '2016-05-25T11:13:22+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=55'
permalink_old: /2016/05/25/cbse-2016-all-india-data-analysis/
categories:
    - Uncategorized
---

I recently presented you with [a frequency distribution of CBSE board marks for DPS Vasant Kunj](https://nmn.gl/blog/cbse-2016-analysis-of-dps-vasant-kunj/), and now I’m back with an analysis of **4052** CBSE schools across India, with results of over **476898** students.

Here are the interactive subject-wise charts plotted between number of students and number of marks scored.

I found many interesting trends, hope you enjoy sifting through the results as well. I might detail *how exactly* I obtained the data in another post, let me know if you’re looking forward to it. In the meanwhile, if NIC requires any sort of real security on their websites, tell them to hire me — my contact details are on the right.

Special thanks to Aayush Bhasin, Aditya Garg, Tanay Rajoria, Divyansh Sharma, Bhuvesh Mehendiratta.

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.3/Chart.min.js" markdown="1"></script>  
<script src="{{ "static/cbse-2016/all.js" | relative_url }}" markdown="1"></script>  
<script markdown="1">  
  var toHundred = [];
  for ( var i = 0; i <= 100; i++ ) {
    toHundred.push(i);
  }

  function getColor (i) {
    i = i || 0
    var colors = [
      '26, 188, 156,',
      '46, 204, 113,',
      '52, 152, 219,',
      '155, 89, 182,',
      '52, 73, 94,',
      '241, 196, 15,',
      '230, 126, 34,',
      '231, 76, 60,'
    ]

    return colors[i % colors.length]
  }

  function slugify (word) {
    return word.toLowerCase().replace(/ /g, '-')
  }

  function capitalCase (word) {
    var words = word.split(' ');
    words.forEach(function(word, idx) {
      words[idx] = word[0].toUpperCase() + word.substr(1).toLowerCase();
    });
    return words.join(' ')
  }

  function getTotal (distri) {
    var sum = 0;
    distri.forEach(function(item) {
      sum += item;
    })
    return sum;
  }

  var j = 0;
  for ( var subject in all ) {
    if (  !all.hasOwnProperty(subject) ) continue;
    var distribution = all[subject];
    var total = getTotal(distribution)
    if ( total < 10 ) continue;

    var ctx = document.createElement('canvas')
    ctx.setAttribute('id', slugify(subject))

    var title = document.createElement('h3')
    title.innerHTML = capitalCase(subject) + ' &mdash; Total: ' + total

    document.querySelector('.post').appendChild(title)
    document.querySelector('.post').appendChild(ctx)

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: toHundred,
        datasets: [
          {
            label: capitalCase(subject) + ' | Number of students' ,
            backgroundColor: 'rgba('+ getColor(j) +'.6)',
            hoverBackgroundColor: 'rgba('+ getColor(j) +'.8)',
            data: distribution
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 1,
            categoryPercentage: 1,
            ticks: {
              fontSize: 12,
              maxTicksLimit: 25,
              maxRotation: 0,
              stepSize: 5
            }
          }],
          yAxes: [{
            // display: false
            stepSize: 1,
            ticks: {
              userCallback: function(value, index, values) {
                return (value/total * 100).toFixed(0) + '%'
              }
            }
          }]
        }
      }
    })
    j++;
  }
</script>

[Catch me on Facebook](https://www.facebook.com/namanyayg)