const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);



var today = new Date();
var emname= "Shiva"+today.getFullYear()+'-'+(today.getMonth()+1)+"-"+today.getDate()+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();;

describe('TestCase for adding an employee',()=>{
    it('Adding a user',(done)=>{
        chai.request("http://localhost:7800").post("/addEmployee").send({name:emname,products:10}).
        then((res)=>{
            expect(res).to.have.status(200);
            done();
        }).catch((err)=>{
            throw err;
        });
    });
});



describe("TestCase for updating employees",()=>{
    it("After Updating employee should return status 200",(done)=>{
        chai.request("http://localhost:7800").put("/updateProducts").send({name:emname,products:15}).
        then((res)=>{
            expect(res).to.have.status(200);
            done();
        }).catch((err)=>{
            throw err;
        });

    });
});

describe('TestCase for getting employees',()=>{
    it('Should return me status code200',(done)=>{
        chai.request('http://localhost:7800').get("/getEmployeeQueryParams").query({name:emname})
        .then((res)=>{
            expect(res).to.have.status(200);
            done();
        }).catch((err)=>{
            throw err;
        });
    })
});

describe("TestCase for Deleting User",()=>{
    it("Deleting user and expecting 200",(done)=>{
        chai.request("http://localhost:7800").delete("/deleteEmployee").send({empname:emname}).
        then((res)=>{
            expect(res).to.have.status(200);
            done();
        }).catch((err)=>{
            throw err;
        });
    });    
});

//negative testcase
describe("Negative TestCase",()=>{
    it("Check if a user who is not present getting deleted",(done)=>{
        chai.request("http://localhost:7800").delete("/deleteEmployee").send({empname:"RaviKick"}).
        then((res)=>{
            expect(res).to.have.status(401);
            done();
        }).catch((err)=>{
            throw err;
        });
    });
});