/************** 此文件会在所有的页面懒加载时加入到页面  ********/

//Table JS
window.onload = function () {
    var tableCont = document.querySelector('#table-cont')
    function scrollHandle(e) {
        var scrollTop = this.scrollTop;
        this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
    }
    tableCont.addEventListener('scroll', scrollHandle)
}