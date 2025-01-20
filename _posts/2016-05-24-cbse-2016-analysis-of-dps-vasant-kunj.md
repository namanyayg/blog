---
id: 58
title: 'CBSE 2016 Analysis of DPS Vasant Kunj'
date: '2016-05-24T07:05:25+00:00'
author: namanyayg
layout: post
guid: 'http://symmetrycode.com/?p=54'
permalink_old: /2016/05/24/cbse-2016-analysis-of-dps-vasant-kunj/
categories:
    - Uncategorized
---

Update: Check out the [analysis done for 4L students across India](https://nmn.gl/blog/cbse-2016-all-india-data-analysis/).

Our school has published a [pretty exhaustive analysis](http://dpsvasantkunj.com/images/pdf/result/Mdetail-result2015-16.pdf), but I decided to make something more prettier and with more statistics.

I’ve excluded subjects that have less than 10 students.

Many interesting conclusions can be drawn – I’ll leave those up to you.

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.3/Chart.min.js" markdown="1"></script>  
<script src="{{ "static/cbse-2016/dpsvk.js" | relative_url }}" markdown="1"></script>  
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
  for ( var subject in dpsvk ) {
    if (  !dpsvk.hasOwnProperty(subject) ) continue;
    var distribution = dpsvk[subject];
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