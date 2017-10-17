var express = require('express');
var cors = require('cors');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url='mongodb://localhost:27017/aagan';
var ObjectID = require('mongodb').ObjectID;
var current_user=[];
var sample=[];
var all_users_data=[];
var final_result=0;
app.use(cors());

app.get('/tryThis',function(req,res){

	var login_authorisation_function_mongo_db = function(db,callback){

	 current_user=[];

	 var cursor = db.collection('aaganwadi_login').find();

		 cursor.each(function(err,doc){
				 assert.equal(err,null);
				 if(doc!=null){
					 sample.push(doc);
				 }else {
						 callback();
				 }

		 });

		 setTimeout(function(){
				all_users_data=sample;
				console.log(all_users_data);
				console.log(req.query.usernameinput);
				console.log(req.query.password);

				for(var i=0;i<all_users_data.length;i++)
				{
					if(all_users_data[i].user_name==req.query.usernameinput && all_users_data[i].password==req.query.password )
					{
						current_user=all_users_data[i];
						acess_value=1;
						console.log("I am in");
						break;
					}
				}

				setTimeout(function(){
						res.send(current_user);// sending response to the front-end with details of current user it may be empty
				},500);

		},2000);

	 }


		 MongoClient.connect(url, function(err, db) {
	   assert.equal(null, err);

	   login_authorisation_function_mongo_db(db, function() {
	        db.close();
	    });

	  });

		// console.log(req.query.usernameinput)
	  // console.log(req.query.password)
		// res.send(req.query.usernameinput)

});

app.get('/qrScan',function(req,res){

	var modified_response;

	var qr_code_function_mongo_db = function(db,callback){

		db.collection('aaganwadi_supply').update({'qr_code':req.query.qrcodescannedvalue,'date_of_scan':'--'},{$set:{'date_of_scan':Date()}},function(err,res){
			assert.equal(err,null);
			if(res.result.nModified==0){
				console.log("Was not able to change");
			}
			else{
				console.log("Supplied");
			}
			modified_response=res.result.nModified;
			db.close();
		});

		setTimeout(function(){
			console.log(modified_response);
			res.send({"val":modified_response});
		},500)

  }

	MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);

	qr_code_function_mongo_db(db, function() {
			 db.close();
	});

 });

});

app.get('/getGeo',function(req,res){

	var login_authorisation_function_mongo_db = function(db,callback){

	 var current_geo_location_aagan=[];

    var cursor = db.collection('aaganwadi_database').find({'_id':ObjectID(current_user.aagan_id)});

		 cursor.each(function(err,doc){
				 assert.equal(err,null);
				 if(doc!=null){
					 current_geo_location_aagan.push(doc);
				 }else {
						 callback();
				 }
		 });

		 setTimeout(function(){
				all_users_data=current_geo_location_aagan;
				console.log(all_users_data);
		    res.send(all_users_data);

		},2000);

	 }


		 MongoClient.connect(url, function(err, db) {
		 assert.equal(null, err);

		 login_authorisation_function_mongo_db(db, function() {
					db.close();
			});

		});

});


app.get('/getTheAagan',function(req,res){

  final_result=0;

	sample=[];

	var get_aagana_this_student= function(db,callback){

	 var cursor = db.collection('stud_database').find({'_id':ObjectID(req.query.studid)});

		 cursor.each(function(err,doc){
				 assert.equal(err,null);
				 if(doc!=null){
					 sample.push(doc);
				 }else {
						 callback();
				 }

		 });

		 setTimeout(function(){

				all_users_data=sample;

				for(var i=0;i<all_users_data.length;i++)
				{
					if(all_users_data[i].aagan_id==req.query.aaganitattend)
					{
            final_result=1;
						console.log("I am in");
						break;
					}
				}

				setTimeout(function(){
					console.log(all_users_data);
					res.send({"val":final_result});
				},500);



		},2000);

	 }


		 MongoClient.connect(url, function(err, db) {
		 assert.equal(null, err);

		 get_aagana_this_student(db, function() {
					db.close();
			});

		});
});

app.get('/addtoRegistry',function(req,res){

	function tell_mongo_to_insert_student_attendance(db,callback){

		var contents={stud_id:req.query.studid_new,aagan_id:current_user.aagan_id,date_of_attendance:Date()};
		db.collection('stud_registry_database').insertOne(contents,function(err,res){
					assert.equal(err,null);
					console.log("Attendance Taken Succesfully");
					db.close();
		});
		res.send({"val":1});
	}

	MongoClient.connect(url, function(err, db) {
			assert.equal(err,null);
			tell_mongo_to_insert_student_attendance(db,function(){
				db.close();
			});
	});

});



var current_user_aagan_website_aagan_website=[];
var all_users_data=[];

app.get('/get_me_the_aagan_id',function(req,res){

  console.log("hello");
  function getting_all_the_user_name(db,callback){

    current_user_aagan_website_aagan_website=[]; // removing the old user

    var your_applications=db.collection('aaganwadi_database').find();
    your_applications.each(function(err,doc){
      assert.equal(err,null);
      if(doc!=null){
        sample.push(doc);
      }
      else
        {
          callback();
        }
    });

    setTimeout(function(){

        all_users_data=sample;
        console.log(req.headers.aaganwadiname);

        for(var i=0;i<all_users_data.length;i++)
        {
          if(all_users_data[i].name==req.headers.aaganwadiname)
          {
            current_user_aagan_website_aagan_website=all_users_data[i];
            acess_value=1;
            console.log("I am in");
            break;
          }
        }

        setTimeout(function(){
            res.send(current_user_aagan_website_aagan_website);// sending response to the front-end with details of current user it may be empty
        },500)

    },1000);

  };

  MongoClient.connect(url, function(err, db) {
      assert.equal(err,null);
      getting_all_the_user_name(db,function(){
        db.close();
      });
  });

});

app.get('/take_immunisation',function(req,res){

	console.log("image taken Sucesfully");

	function tell_mongo_to_insert_student_immunization(db,callback){

		var contents={stud_id:req.query.shivamidvalue,aagan_id:req.query.aaganidvalue,desciption:req.query.immuneDesc,date_of_immunization:Date()};
		db.collection('immun_registry').insertOne(contents,function(err,res){
					assert.equal(err,null);
					console.log("Immuned Succesfully");
					db.close();
		});
		res.send({"val":1});
	}

	MongoClient.connect(url, function(err, db) {
			assert.equal(err,null);
			tell_mongo_to_insert_student_immunization(db,function(){
				db.close();
			});
	});

})

app.get('/take_nutrition_details',function(req,res){

	console.log(req.query.aaganidnut);



	function tell_mongo_to_insert_student_nutrition(db,callback){

		var contents={stud_id:req.query.studidnut,aagan_id:req.query.aaganidnut,height:req.query.nutheight,weight:req.query.nutweight,date_of_registry_immun:Date(),waist_size:req.query.waistsize};
		db.collection('nutrition_registry').insertOne(contents,function(err,res){
					assert.equal(err,null);
					console.log("Recorded Sucessfully");
					db.close();
		});
		res.send({"val":1});
	}

	MongoClient.connect(url, function(err, db) {
			assert.equal(err,null);
			tell_mongo_to_insert_student_nutrition(db,function(){
				db.close();
			});
	});

});

app.get('/get_me_the_supply',function(req,res){
  console.log("hello");
  console.log(req.headers.aaganwadiid);
  console.log("hello");
  sample=[];
  all_users_data=[];

  var supply_array=[];

  function call_mongo_to_get_supply(db,callback){

    var your_applications=db.collection('aaganwadi_supply').find({'aagan_id':req.headers.aaganwadiid});
    your_applications.each(function(err,doc){
      assert.equal(err,null);
      if(doc!=null){
        sample.push(doc);
      }
      else
        {
          callback();
        }
    });

    setTimeout(function(){

      console.log(sample);
      res.send(sample);

    },1000);

  };

  MongoClient.connect(url, function(err, db) {
      assert.equal(err,null);
      call_mongo_to_get_supply(db,function(){
        db.close();
      });
  });
});


app.listen(3000);
