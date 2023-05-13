import Mock from "mockjs"
import carouselList from './carouselList.json'
import notificationList from './notificationList.json'
import newsList from './newsList.json'
import doctorList from './doctorList.json'
import doctorDetail from './doctorDetail.json'
import departmentList from './departmentList.json'
import vacancyDetail from './vacancyList.json'

Mock.mock('/mock/carouselList', carouselList);
Mock.mock('/mock/notificationList', notificationList);
Mock.mock('/mock/newsList', newsList);
Mock.mock(/\/mock\/doctorList/, 'get', (options)=>{
    const url = options.url;
    if (url.indexOf('?') === -1) {
        return Mock.mock(doctorList);
    }
    return Mock.mock({
        result: 1,
        data: [{
            "id": "@natural",
            "name": decodeURI(url.substring(url.indexOf('=') + 1)),
            "department": "@ctitle(2)",
            "image": "@dataImage",
            "introduction": "@cparagraph"
        }]
    })
});
Mock.mock(/\/mock\/doctorDetail/, doctorDetail);
Mock.mock('/mock/departmentList', departmentList);
Mock.mock(/\/mock\/vacancyList/, vacancyDetail);