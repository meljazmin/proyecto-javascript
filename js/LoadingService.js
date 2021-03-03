let loading;

$.ajax({
    url: '/pages/common/loading.html',
    async: false
}).done(data => {
    loading = $(data);
}).fail((xhr, err, thrown) => {
    console.warn('No se pudo obtener el loading.html', err);
});

const LoadingService = {
    showLoading: () => {
        $('body').css('overflow', 'hidden').append(loading);
        loading.animate({
            opacity: 1
        }, 500);
    },
    hideLoading: () => {
        loading.animate({
            opacity: 0
        }, 500, () => {
            loading.remove();
        });
        $('body').css('overflow', 'auto');
    }
}