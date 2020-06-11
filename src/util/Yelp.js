const apiKey = 'oInacGKuW4xqk0s04dm5vo4GUZhrnIQofjXm-9Zp_Uj3WE8BfkpykNhB2R3b2tSG4fUmaGtlLgjjC8pzwYJL-JXoKVn5V1JUnBPZjrLHVQ-BVxDoPuOxb85SWMTKXnYx';

const Yelp = {  
    search(term, location, sortBy) {
        return fetch(
            `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        url: business.url,
                        phone: business.phone
                    }
                })
            }else {

            }
        });
    }
};

export default Yelp;