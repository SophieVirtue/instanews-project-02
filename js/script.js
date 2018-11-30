$(document).ready(function() {

  $('#select-options').on('change', (event) => {
    
    $('.nyt-logo').addClass('change-logo');
    $('.header-content').addClass('change-header');
    $('.display-logo').addClass('change-display-logo');
    $('.display-text').addClass('change-display-text');
    
    event.preventDefault();
   
    $('.loading').append(
      '<img class="loading-gif" src="./images/ajax-loader.gif">'
    );

    const section = $('#select-options').val();
    getStories(section);
  });

    const getStories = (section) => {
    let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json`;
    url +=
      '?' +
      $.param({
        'api-key': '3a9427a58f294ca2aa06700253bbca28'
      });

    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON'
    })

      
      .done(data => {
        const $results = $('.results');
        
        $results.empty();
        $('.homescreen-change').addClass();

        let filteredData = data.results.filter(info => {
          return info.multimedia[4];
        }).slice(0, 12);

        for (let value of filteredData) {
          $results.append(
            `<a href="${
              value.url
            }" target="_blank"><article style="background: url(${
              value.multimedia[4].url
            }) no-repeat center; background-size: cover;"><p class="abstract">${
              value.abstract
            }</p></article></a>`
          );
        }
      })
      
      .fail(() => {
        $results.empty();
        $results.append('<p>Apologies, this page is not loading...</p>');
      })

      .always(() => {
        $('.loading').empty();
      });
  }
});
