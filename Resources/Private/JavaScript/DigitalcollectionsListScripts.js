/*
 *
 * JS functions
 * ================================================
 * functions and adjustments to
 * the list views
 *
 */

$(function () {

    // setup mobile event
    var mobileEvent = mobileCheck() ? 'touchstart' : 'click';

    // sub entry toggle in list views
    $('.tx-dlf-morevolumes, .tx-dlf-hidevolumes').on(mobileEvent, function (event) {
        $(this).parent().toggleClass('tx-dlf-volumes-open').find('.tx-dlf-volume').slideToggle();
    });

    // Additional transformations for sidebar search box to use it as offcanvas element in smaller views
    $('aside.sidebar .tx-dlf-search').parent().addClass('tx-dlf-enable-offcanvas').append('<div class="offcanvas-toggle" />');
    $transition = 'all .3s ease-out';
    setTimeout(function () {
        $('aside.sidebar .tx-dlf-search').parent().css({
            '-webkit-transition': $transition,
            '-o-transition': $transition,
            'transition': $transition
        });
    }, 250);

    // Menu toggles for offcanvas toc and metadata
    $('.offcanvas-toggle').on(mobileEvent, function (event) {
        $(this).parent().toggleClass('open');
    });

    // Init collection overview on intro page
    var layoutColumns = '<li class="tx-dlf-collection-col col-1"></li><li class="tx-dlf-collection-col col-2"></li><li class="tx-dlf-collection-col col-3"></li>';
    $('.tx-dlf-collection-list').prepend(layoutColumns).append($('.tx-dlf-collection-list-additionals')).randomize('li.tx-dlf-collection-item').colcade({
        columns: '.tx-dlf-collection-col',
        items: '.tx-dlf-collection-item'
    });

    // Add toggle element and corresponding function to facets
    $('.tx-dlf-search-facets > ul > li').each(function () {
        var facetsToShow = 5,
            facetCount = $(this).find('ul').children('li').length,
            facetShowLabel = ($('html[lang="de-DE"]')[0]) ? 'Zeige ' + (facetCount - facetsToShow) + ' weitere Facetten' : 'Show ' + (facetCount - facetsToShow) + ' more facets',
            facetHideLabel = ($('html[lang="de-DE"]')[0]) ? 'Letzten ' + (facetCount - facetsToShow) + ' Facetten ausblenden' : 'Hide ' + (facetCount - facetsToShow) + ' last facets';
        if (facetCount > facetsToShow) {
            $(this).find('ul li:gt(' + (facetsToShow - 1) + ')').hide();
            $(this).append('<div class="facets-toggle">' + facetShowLabel + '</div>');
            $(this).find('.facets-toggle').on(mobileEvent, function () {
                $(this).text(($(this).parent().hasClass('facets-expanded')) ? facetShowLabel : facetHideLabel).parent().toggleClass('facets-expanded');
                $(this).parent().find('ul li:gt(' + (facetsToShow - 1) + ')').slideToggle();
            });
        }
    });

    // Add a switch and function for alphabetical order of collections elements on intro page
    var labelGallery = ($('html[lang="de-DE"]')[0]) ? 'Galerie' : 'Gallery',
        labelAlphabetical = ($('html[lang="de-DE"]')[0]) ? 'Alphabetisch' : 'Alphabetical',
        sortItems = $('.tx-dlf-collection-list li.tx-dlf-collection-item').get(),
        storedItems = sortItems;
    $('.tx-dlf-collection').prepend('<div class="tx-dlf-list-toggle-container"><span class="label active">' + labelGallery + '</span><div class="tx-dlf-list-toggle"><div class="toggle-state"></div></div><span class="label">' + labelAlphabetical + '</span></div>');
    $('.tx-dlf-list-toggle-container').on(mobileEvent, function () {
        if ($(this).hasClass('alphabetical')) {
            $('.tx-dlf-collection-list li.order-label').remove();
            $.each(storedItems, function (i, li) {
                $('.tx-dlf-collection-list').append(li);
            });
            $('.tx-dlf-collection-list').removeClass('alphabetical alphabetical-ready').colcade({
                columns: '.tx-dlf-collection-col',
                items: '.tx-dlf-collection-item'
            });
            document.cookie = 'tx-dlf-galleryview-state=gallery; path=/';
        } else {
            $('.tx-dlf-collection-list').colcade('destroy').addClass('alphabetical');
            sortAlphabetical(this, sortItems);
            document.cookie = 'tx-dlf-galleryview-state=alphabetical; path=/';
        }
        $(this).toggleClass('alphabetical').find('.label').toggleClass('active');
    });

    // Add toggle and function for extended search
    var extendedSearchLabel = $('html[lang="de-DE"]')[0] ? 'Erweiterte Suche<span> ausblenden</span>' : '<span>Hide </span>Extended Search';
    $('.collections .tx-dlf-search form').append('<div class="extended-search-toggle">' + extendedSearchLabel + '</div>');
    $('.extended-search-toggle').on(mobileEvent, function () {
        $(this).parent().toggleClass('extendend-search-active');
    });
    // Add extra CSS-class to parent div to make <h3> styleable
    $('.collections .tx-dlf-search').parent().addClass('search-form');

});

// check mobile device to specify click events and set a global variable. Simple use it via $('selector').on(mobileEvent, function() { do something });
function mobileCheck() {
    var check = false;
    (function (a) {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

// randomizer to shuffle collection elements on intro page
$.fn.randomize = function (selector) {
    (selector ? this.find(selector) : this).parent().each(function () {
        $(this).children(selector).sort(function () {
            return Math.random() - 0.5;
        }).detach().appendTo(this);
    });
    return this;
};

// Sort function for collection entries on intro page
sortAlphabetical = function (element, sortItems) {
    sortItems.sort(function (a, b) {
        var sortA = $(a).find('h4').text();
        var sortB = $(b).find('h4').text();
        if (sortA < sortB) return -1;
        if (sortA > sortB) return 1;
        return 0;
    });
    var prevFirstChar,
        isAlreadyShown = false;
    $.each(sortItems, function (i, li) {
        $('.tx-dlf-collection-list').append(li);
        currentFirstChar = $(this).find('h4').text().charAt(0);
        if (prevFirstChar !== currentFirstChar && isNaN(currentFirstChar)) {
            $(this).before('<li class="order-label"><div class="order-label-value">' + $(this).find('h4').text().charAt(0) + '</div></li>');
        }
        if (!isNaN(currentFirstChar) && !isAlreadyShown) {
            $(this).before('<li class="order-label"><div class="order-label-value">0–9</div></li>');
            isAlreadyShown = true;
        }
        prevFirstChar = $(this).find('h4').text().charAt(0);
        currentFirstChar = undefined;
    });

    function showAlphabeticalList() {
        $('.tx-dlf-collection-list').addClass('alphabetical-ready');
    }

    window.setTimeout(showAlphabeticalList, 100);
};


// EOF
