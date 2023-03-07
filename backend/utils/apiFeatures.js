class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword =this.queryStr.keyword ? {
            name:{
                $regex :this.queryStr.keyword,
                $options: 'i'
            }

        }: {}

        console.log(keyword);

        this.query = this.query.find({ ...keyword});
        return this;
    }
    filter(){

        const queryCopy = { ...this.queryStr};


        //remove fields from th query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        

        //Advance filter for price, ratings etc.
        let queryStr = JSON.stringify(queryCopy)

        //replace the greater than or less that with dolor sign
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    //change to the pages numbers
    pagination(resPerPage){
        const currentPage =Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
    
}

module.exports = APIFeatures