/* Teste em VueJS consumindo API da geonames.org - http://www.geonames.org/ - Rafael Savioli */

new Vue({
    el: 'body',
    
    data: {
        estados: [],
        currentPage: 0,
        itemsPerPage: 5,
        resultCount: 0
    },

    created: function(){
        this.$http.get("http://www.geonames.org/childrenJSON?geonameId=3469034")
        .then(resp => {
            this.estados = resp.data.geonames;
            this.currentPage = 0
        });
    },

    computed: {
        totalPages: function() {
            return Math.ceil(this.resultCount / this.itemsPerPage)
        }
    },

    methods: {
        setPage: function(pageNumber) {
            this.currentPage = pageNumber
        }
    },
    
    filters: {
        paginate: function(list) {
            this.resultCount = list.length
            if (this.currentPage >= this.totalPages) {
              this.currentPage = this.totalPages - 1
            }
            var index = this.currentPage * this.itemsPerPage
            return list.slice(index, index + this.itemsPerPage)
        }
    }
})