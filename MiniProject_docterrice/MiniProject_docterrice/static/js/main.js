$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Function to update prediction result display
    function updatePredictionResult(label, confidence) {
        $('#label').text('Label: ' + label);
        $('#confidence').text('Confidence: ' + confidence);
    }


    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);


        $(this).hide();
        $('.loader').show();


        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {

                $('.loader').hide();
                $('#result').fadeIn(600);
                var confidencePercentage = data.confidence * 100;
                $('#result').text('Prediction : ' + data.label + ' , Confidence : ' + confidencePercentage.toFixed(2) + '%');
                console.log('Success!');
                // Update the label and confidence elements in the HTML
                updatePredictionResult(data.label, data.confidence);
                if (data.label === "Brown Spot Disease") {
                    $('#additional-info').text('โรคใบจุดสีน้ำตาล\n(Brown Spot Disease)\nสาเหตุเกิดจาก\nเชื้อรา Helminthosporium oryzae');
                    $('#additional-info2').text('- ปรับปรุงดินโดยการไถกลบฟาง หรือเพิ่มความอุดมสมบูรณ์ดินโดยการปลูกพืชปุ๋ยสด หรือปลูกพืชหมุนเวียนเพื่อช่วยลดความรุนแรงของโรค\n- คลุกเมล็ดพันธุ์ก่อนปลูกด้วยสารป้องกันกำจัดเชื้อรา เช่น แมนโคเซ็บ หรือ คาร์เบนดาซิม+แมนโคเซ็บ อัตรา 3 กรัมต่อเมล็ด 1 กิโลกรัม\n- ใส่ปุ๋ยโปแตสเซียมคลอไรด์ (0-0-60) อัตรา 5-10กิโลกรัมต่อไร่ ช่วยให้ข้าวเป็นโรคน้อยลง\n- กำจัดวัชพืชในนา ทำแปลงให้สะอาด และใส่ปุ๋ยในอัตราที่เหมาะสม');
                    $('#additional-info3').attr('src', 'https://cdn.pic.in.th/file/picinth/ya4.png') .css({'display': 'block',  'margin': '0 auto', 'text-align': 'center' });
                    $('#additional-info3').show();
                    $('#goLink').show();
                } else if (data.label === "Dirty Panicle Disease") {
                    $('#additional-info').text('โรคเมล็ดด่าง\n(Dirty Panicle Disease)\nสาเหตุหลัก 6 ชนิดได้แก่\nCurvularia lunata (Wakk) Boed.\nCercospora oryzae I.Miyake.\nBipolaris oryzae Breda de Haan.\nFusarium semitectum Berk & Rav.\nTrichoconis padwickii Ganguly.\nSarocladium oryzae Sawada.');
                    $('#additional-info2').text('- ช่วงข้าวตั้งท้อง: พ่นสารสโตรดี้ในอัตรา 50-60 มิลลิลิตรต่อไร่หรือ 15-20 มิลลิลิตรต่อน้ำ 20 ลิตร เพื่อป้องกันโรคเมล็ดด่าง\n- ช่วงรวงข้าวเริ่มโง้ง: พ่นสารแอ็กโซนในอัตรา 50-60 มิลลิลิตรต่อไร่หรือ 15-20 มิลลิลิตรต่อน้ำ 20 ลิตร เพื่อป้องกันโรคเมล็ดด่างและส่งเสริมรวงข้าวให้เหลืองสม่ำเสมอทั้งรวง\n- หากพบโรคเมล็ดด่าง: พ่นสารสโตรดี้หรือแอ็กโซนตามคำแนะนำข้างต้น และผสมร่วมกับแอ็กซ่าหรือเดซี่เพื่อป้องกันและลดการดื้อยาของเชื้อราสาเหตุโรคพืช. แนะนำให้ผสมร่วมกับสารเสริมประสิทธิภาพคอมโบเนนท์บี อัตรา 5-10 มิลลิลิตรต่อน้ำ 20 ลิตรทุกครั้งที่พ่นสาร');
                    $('#additional-info3').attr('src', 'https://cdn.pic.in.th/file/picinth/ya1.png').css({'display': 'block',  'margin': '0 auto', 'text-align': 'center' });
                    $('#additional-info3').show(); 
                    $('#goLink').show();
                } else if (data.label === "Narrow BrownSpot Disease") {
                    $('#additional-info').text('โรคใบขีดสีน้ำตาล\n(Narrow Brown Spot Disease)\nสาเหตุเกิดจาก\nเชื้อรา Cercospors oryzae');
                    $('#additional-info2').text('- ใช้พันธุ์ต้านทานที่เหมาะสมเฉพาะท้องที่ เช่น ภาคใต้ ใช้พันธุ์แก่นจันทร์ ดอกพยอม\n- ใช้ปุ๋ยโปแตสเซียมคลอไรด์ (0-0-60) อัตรา 5-10 กิโลกรัมต่อไร่ สามารถช่วยลดความรุนแรงของโรคได้\n- กรณีที่เกิดการระบาดของโรครุนแรงอาจใช้สารป้องกันกำจัดเชื้อรา เช่น บาวีสทิน (คาร์เบนดาซิม), เซอร์โคบิน หรือ ทอปซิน-เอ็ม (ไธโอฟาเนส-เมททิล)');
                    $('#additional-info3').attr('src', 'https://cdn.pic.in.th/file/picinth/ya3.png').css({'display': 'block',  'margin': '0 auto', 'text-align': 'center' });
                    $('#additional-info3').show();
                    $('#goLink').show();
                } else if (data.label === "Rice Blast Disease") {
                    $('#additional-info').text('โรคไหม้\n(Rice Blast Disease)\nสาเหตุเกิดจาก\nเชื้อรา Pyricularia oryzae.');
                    $('#additional-info2').text('- ไม่ควรตกกล้าหรือหว่านข้าวหนาแน่นเกินไป แนะนำให้ใช้อัตรา 15 กิโลกรัมต่อไร่ และแบ่งแปลงย่อยเพื่อให้มีพื้นที่ทำงานได้อย่างทั่วถึงและมีการถ่ายเทอากาศได้อย่างดี\n- ตรวจดูแปลงเป็นประจำโดยเฉพาะแปลงที่มีประวัติการระบาดของโรค หากพบโรคไหม้ในระยะแรกๆ สามารถกำจัดโดยตัดใบหรือถอนต้นที่มีโรคออกจากแปลง\n- คลุกเมล็ดพันธุ์ด้วยสารป้องกันกำจัดเชื้อราก่อนนำไปเพาะปลูก เช่น คาซูกามัยซิน, ไตรไซคลาโซล, คาร์เบนดาซิม, โพรคลอราซ ตามอัตราที่แนะนำ\n- หากพบโรคไหม้ระบาด ใช้สารกำจัดเชื้อรา เช่น คาซูกามัยซิน, คาร์เบนดาซิม, อีดิเฟนฟอส, ไตรไซคลาโซล, ไอโซโพรไทโอเลน ตามอัตราที่แนะนำ');
                    $('#additional-info3').attr('src', 'https://cdn.pic.in.th/file/picinth/ya2.png').css({'display': 'block',  'margin': '0 auto', 'text-align': 'center' });
                    $('#additional-info3').show();
                    $('#goLink').show();
                } else {
                    $('#additional-info').text(''); // ลบข้อมูลเพิ่มเติมหากไม่ตรงคลาส
                    $('#goLink').hide();
                }
                
            },
        });
    });


    $('#imageUpload').change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });
});

length;
