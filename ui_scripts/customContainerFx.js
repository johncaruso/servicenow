/**
 * customContainerFx
 * @id {string} id     sysid of container
 * @action {string} action expecting open or close to open or close a container
 */
var customContainerFx = function (id, action) {
    var container = $j('#container_row_' + id);    
    var button = $j('#img_' + id);    
    var row = $('question_container_' + id);
    if (action == 'close') {      
        button.removeClass('container-open');      
        button.addClass('container-close');      
        container.slideUp(); //really any of these can be used here http://api.jquery.com/category/effects/
            
    }
    if (action == 'open') {      
        button.removeClass('container-close');      
        button.addClass('container-open');      
        container.slideDown(); //really any of these can be used here http://api.jquery.com/category/effects/
            
    }
};