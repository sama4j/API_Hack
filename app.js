var obtainData = function(ent1,ent2,ent3) {

	//parameters to pass
	var requested = {api_key:'6h9ayma8syetfbw6t666gngs',
						q: ent1,
						sub: ent2,
						typeM: ent3};

  // make our AJAX call to the test server
  var output1 = $.ajax({
  	dataType: "jsonp",
    type: 'GET',
    url: "http://api.springer.com/metadata/jsonp?q=("+requested.q+" AND type:"+requested.typeM+" AND subject:"+requested.sub+")&api_key="+requested.api_key+"",
  })
  // the done block gets executed after the AJAX call returns—whenever that is
  .done(function(output1) {
    /*$('.hidden').append('<p>Response at: ' + timeNow() + '</p>');*/
    var searchResults = showSearchResults(requested.q, output1.records.length, requested.typeM);
	$('.hidden').html(searchResults);
	$.each(output1.records, function(i, record) {
		$('.queried').append('<li></li>')
		showOutput(record);
	});
	$('.notice').slideDown();
  });
};

var showSearchResults = function(query, resultNum, typeM) {
	var results = resultNum + ' '+ typeM + ' title results for <strong>' + query;
	return results;
};

var showOutput = function(answers) {
	
	// clone our result template code
	//var result = $('.homework .queried').clone();
	var result = $('.homework .queried li:last');
	
	// Set the question properties in result
	result.append('<p class ="one">'+answers.title+'</p>');

	// set the date asked property in result
	result.append('<p class ="two"><span class ="mention">Publication name: </span>'+answers.publicationName+'</p>');

	// set the #views for question property in result
	result.append('<p class ="three"><span class ="mention">Published on: </span>'+answers.publicationDate+'</p>');

	result.append('<a href ='+answers.url+'>'+answers.url+'</a>');
	
	return result;
};

// When DOM loads, add the autoupdating clock, and call asyncDemo
$(document).ready(function(){

  	//localClock();
  	$('.btn').click( function(event){
  		event.preventDefault();
		// zero out results if previous search has run
		$('.notice').hide();
		$('.queried').html('');
		// get the value of the tags the user submitted
		var tags = $('#in1').val();
		var subject = $('#subj option:selected').val();
		var typeM = $('#typeP option:selected').val();
		obtainData(tags,subject,typeM);

	});

});
