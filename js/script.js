var next = 1;
var clicked = false;
var imageArray = [];
function initBanner() {
    for (var i = 1; i <= 5; i++)
        imageArray.push("url(assets/images/banner/banner" + i + ".jpg)");
    document.getElementById("banner").style.backgroundImage = imageArray[0];
    setTimeout(runBanner, 3000);
}
function runBanner() {
    var image = document.getElementById("banner").style.backgroundImage.match(/(\d+)/); // get the number of the current banner from the url
    var index = image[0] - 1 + next; // find the index of the next banner or previous banner
    if (index >= imageArray.length)
        index = 0;
    else if (index < 0)
        index = imageArray.length - 1;
    document.getElementById("banner").style.backgroundImage = imageArray[index];
    if (!clicked) {
        setTimeout(runBanner, 3000);
    } else {
        clicked = false;
        next = 1;
    }
}
function prevBanner() {
    clicked = true;
    next = -1;
    runBanner();
}
function nextBanner() {
    clicked = true;
    next = 1;
    runBanner();
}
window.onscroll = function() {showbacktop()};
function showbacktop() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("backtotop").style.display = "flex";
    } else {
        document.getElementById("backtotop").style.display = "none";
    }
}
function backtop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function showLogin() {
    document.getElementById("container").style.display = "block";
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "none";
}
function showSignUp() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
}
function backFromLogin() {
    document.getElementById("container").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("wrapper").style.display = "none";
}
function createBook() {
    if (JSON.parse(localStorage.getItem('category')) != null)
        return;
    const category = [
        {id:1, name:"Giáo dục", quantity:0, listcategory: [
            {id:"GK", name:"Sách giáo khoa", quantity:0, books:[
                {id:"GK1", name:"Bộ SGK Lớp 1 - Chân Trời Sáng Tạo",cat:null,price:"186.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK1.jpeg"},
                {id:"GK2", name:"Bộ SGK Lớp 2 - Chân Trời Sáng Tạo",cat:null,price:"179.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK2.jpeg"},
                {id:"GK3", name:"Bộ SGK Lớp 3",cat:null,price:"115.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK3.jpeg"},
                {id:"GK4", name:"Bộ SGK Lớp 4",cat:null,price:"200.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK4.jpeg"},
                {id:"GK5", name:"Bộ SGK Lớp 5",cat:null,price:"240.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK5.jpeg"},
                {id:"GK6", name:"Bộ SGK Lớp 6 - Cánh Diều",cat:null,price:"259.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK6.jpeg"},
                {id:"GK7", name:"Bộ SGK Lớp 7",cat:null,price:"240.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK7.jpeg"},
                {id:"GK8", name:"Bộ SGK Lớp 8",cat:null,price:"180.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK8.jpeg"},
                {id:"GK9", name:"Bộ SGK Lớp 9",cat:null,price:"240.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK9.jpeg"},
                {id:"GK10", name:"Bộ SGK Lớp 10",cat:null,price:"164.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK10.jpeg"},
                {id:"GK11", name:"Bộ SGK Lớp 11",cat:null,price:"249.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK11.jpeg"},
                {id:"GK12", name:"Bộ SGK Lớp 12",cat:null,price:"180.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK12.jpeg"},
                {id:"GK13", name:"Bộ SGK (Sách bài tập) Lớp 2 - Cánh Diều",cat:null,price:"159.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK13.jpeg"},
                {id:"GK14", name:"Sách bài tập Vật Lý Lớp 10 - Cánh Diều",cat:null,price:"22.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK14.jpeg"},
                {id:"GK15", name:"Bộ SGK (Sách bài tập) Lớp 12",cat:null,price:"164.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK15.jpeg"},
                {id:"GK16", name:"Bộ SGK (Sách bài tập) Lớp 6 - Chân Trời Sáng Tạo",cat:null,price:"234.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK16.jpeg"},
                {id:"GK17", name:"Giáo Dục Kinh Tế Và Pháp Luật Lớp 10 - Chân Trời Sáng Tạo",cat:null,price:"27.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK17.jpeg"},
                {id:"GK18", name:"SGK Hoá Học Lớp 10 - Cánh Diều",cat:null,price:"24.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK18.jpeg"},
                {id:"GK19", name:"Sách bài tập Toán Lớp 10 (Tập 1) - Cánh Diều",cat:null,price:"24.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK19.jpeg"},
                {id:"GK20", name:"Sách bài tập Lịch Sử Lớp 10 - Cánh Diều",cat:null,price:"17.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK20.jpeg"},
                {id:"GK21", name:"Sách Chuyên đề Ngữ Văn Lớp 10 - Cánh Diều",cat:null,price:"16.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK21.jpeg"},
                {id:"GK22", name:"Sách Chuyên đề Công Nghệ Lớp 10 - Cánh Diều",cat:null,price:"25.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK22.jpeg"},
                {id:"GK23", name:"Sách bài tập Khoa học tự nhiên Lớp 10 - Cánh Diều",cat:null,price:"28.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK23.png"},
                {id:"GK24", name:"SGK Âm Nhạc Lớp 7 - Cánh Diều",cat:null,price:"11.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK24.png"},
            ]},
            {id:"TK", name:"Sách tham khảo", quantity:0, books:[
                {id:"TK1", name:"Hướng dẫn học Ngữ Văn 6 (Tập 1)",cat:null,price:"69.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK1.jpeg"},
                {id:"TK2", name:"Sách tham khảo Vật Lí 10",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK2.jpeg"},
                {id:"TK3", name:"Sách tham khảo Hoá Học 10",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK3.jpeg"},
                {id:"TK4", name:"Sách tham khảo Khoa học tự nhiên 7",cat:null,price:"125.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK4.jpeg"},
                {id:"TK5", name:"Sách tham khảo Toán 10 (Quyển 1)",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK5.jpeg"},
                {id:"TK6", name:"Sách tham khảo Luyện tập Toán 3 (2 quyển)",cat:null,price:"64.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK6.jpeg"},
                {id:"TK7", name:"Bồi dưỡng Ngữ Văn 10",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK7.jpeg"},
                {id:"TK8", name:"Bồi dưỡng Học sinh giỏi Sinh Học 8",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK8.jpeg"},
                {id:"TK9", name:"Sổ tay kiến thức Hoá Học THPT",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK9.png"},
                {id:"TK10", name:"35 Đề Tiếng Anh Thi Vào Lớp 10 (Có Đáp Án)",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK10.jpeg"},
                {id:"TK11", name:"Combo Sách Bài Tập Nâng Cao Toán Lớp 2",cat:null,price:"113.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK11.jpeg"},
                {id:"TK12", name:"Sách tham khảo Đề Kiểm Tra Tiếng Anh 7",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK12.jpeg"},
                {id:"TK13", name:"Bài tập Tiếng Anh 8 (Không đáp án)",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK13.jpeg"},
                {id:"TK14", name:"Bài tập Tiếng Anh 3",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK14.jpeg"},
                {id:"TK15", name:"Chinh Phục Luyện Thi Vào Lớp 10 Môn Tiếng Anh Theo Chủ Đề",cat:null,price:"109.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK15.jpeg"},
                {id:"TK16", name:"Bài Tập Trắc Nghiệm Tiếng Anh 9 (Có Đáp Án)",cat:null,price:"56.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK16.jpeg"},
                {id:"TK17", name:"Trắc nghiệm Địa Lí Lớp 7",cat:null,price:"42.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK17.jpeg"},
                {id:"TK18", name:"Đề kiểm tra Ngữ Văn Lớp 10",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK18.jpeg"},
                {id:"TK19", name:"Rèn kỹ năng học tốt Toán 8",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK19.jpeg"},
                {id:"TK20", name:"Trả lời câu hỏi & Giải bài tập Ngữ Văn 8",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK20.jpeg"},
                {id:"TK21", name:"Hướng dẫn giải bài tập Vật Lí Lớp 12",cat:null,price:"49.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK21.jpeg"},
                {id:"TK22", name:"Những bài văn mẫu 9",cat:null,price:"61.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK22.jpeg"},
                {id:"TK23", name:"Tuyển chọn 25 đề thi Ngữ Văn kì thi THPT",cat:null,price:"83.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK23.jpeg"},
                {id:"TK24", name:"Giải bài tập Vật Lí 9",cat:null,price:"64.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK24.jpeg"},
    
            ]},
            {id:"TD", name:"Từ điển", quantity:0, books:[
                {id:"TD1", name:"Từ điển Oxford Anh - Anh - Việt (Bìa Vàng)",cat:null,price:"298.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD1.jpeg"},
                {id:"TD2", name:"Từ điển Anh Việt 200.000 từ",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD2.jpeg"},
                {id:"TD3", name:"Từ điển Hán Việt (Bìa Cứng)",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD3.jpeg"},
                {id:"TD4", name:"Từ điển Việt Nga",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD4.jpeg"},
                {id:"TD5", name:"Từ điển cách dùng Tiếng Anh",cat:null,price:"300.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD5.jpeg"},
                {id:"TD6", name:"Từ điển Anh - Việt bỏ túi",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD6.jpeg"},
                {id:"TD7", name:"Từ điển Mỹ Học",cat:null,price:"399.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD7.jpeg"},
                {id:"TD8", name:"Từ điển Nhật - Việt thông dụng",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD8.jpeg"},
                {id:"TD9", name:"Từ điển Chính Tả",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD9.gif"},
                {id:"TD10", name:"Từ điển Nga - Việt",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD10.jpeg"},
                {id:"TD11", name:"Từ điển Nhật - Việt, Việt - Nhật",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD11.jpeg"},
                {id:"TD12", name:"Từ điển Hàn Việt",cat:null,price:"45.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD12.jpeg"},
                {id:"TD13", name:"Từ điển trực quan bỏ túi Pháp - Việt",cat:null,price:"188.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD13.png"},
                {id:"TD14", name:"Từ điển Việt - Hàn",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD14.jpeg"},
                {id:"TD15", name:"Từ điển Tiếng Việt",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD15.jpeg"},
                {id:"TD16", name:"Từ điển Triết Học Habermas",cat:null,price:"135.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD16.jpeg"},
                {id:"TD17", name:"Từ điển bách khoa tương tác cho trẻ em (Anh - Hoa - Việt)",cat:null,price:"66.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD17.jpeg"},
                {id:"TD18", name:"Từ điển Tiếng Anh bằng hình",cat:null,price:"117.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD18.jpeg"},
                {id:"TD19", name:"Từ điển Hoa - Việt",cat:null,price:"78.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD19.jpeg"},
                {id:"TD20", name:"Từ điển - Sách công cụ chữ Hán của Việt Nam và Trung Quốc",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD20.jpeg"},
    
            ]},
        ]},
        {id:2, name:"Văn học", quantity:0, listcategory: [
            {id:"TNG", name:"Truyện ngắn", quantity:0, books:[
                {id:"TNG1", name:"Từ Điển Tiếng 'Em'",cat:null,price:"69.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG1.png"},
                {id:"TNG2", name:"Những Đêm Không Ngủ Những Ngày Chậm Trôi",cat:null,price:"86.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG2.jpeg"},
                {id:"TNG3", name:"Có Một Ngày, Bố Mẹ Sẽ Già Đi",cat:null,price:"96.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG3.jpeg"},
                {id:"TNG4", name:"Màu Nhạt Nắng",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG4.jpeg"},
                {id:"TNG5", name:"Dear, Darling",cat:null,price:"88.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG5.jpeg"},
                {id:"TNG6", name:"Hẹn Nhau Phía Sau Tan Vỡ",cat:null,price:"86.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG6.jpeg"},
                {id:"TNG7", name:"Chúng Ta Rồi Sẽ Hạnh Phúc, Theo Những Cách Khác Nhau",cat:null,price:"86.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG7.png"},
                {id:"TNG8", name:"Gửi Bạn, Người Đã Kiệt Sức Vì Những Chịu Đựng Âm Thầm",cat:null,price:"96.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG8.jpeg"},
                {id:"TNG9", name:"Chuyện ICU - Khi Thiên Thần Nhiễm Bệnh",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG9.jpeg"},
                {id:"TNG10", name:"Mình Phải Sống Như Biển Rộng Sông Dài",cat:null,price:"109.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG10.jpeg"},
                {id:"TNG11", name:"Thế Giới Này Âm Thầm Yêu Em",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG11.jpeg"},
                {id:"TNG12", name:"Vô Thường",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG12.jpeg"},
                {id:"TNG13", name:"Nắng",cat:null,price:"89.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG13.jpeg"},
                {id:"TNG14", name:"Hãy Cầm Lấy Và Đọc",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG14.jpeg"},
                {id:"TNG15", name:"Phụ Nữ Vạn Người Mê",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG15.jpeg"},
                {id:"TNG16", name:"Tôi Thích Bản Thân Nỗ Lực Hơn",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG16.jpeg"},
                {id:"TNG17", name:"Với Đà Lạt Ai Cũng Là Lữ Khách",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG17.jpeg"},
                {id:"TNG18", name:"Cứ Khóc, Cứ Tan Vỡ Và Trưởng Thành",cat:null,price:"78.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG18.jpeg"},
                {id:"TNG19", name:"Danh Tác Việt Nam - Lão Hạc (Tập Truyện Ngắn)",cat:null,price:"52.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG19.jpeg"},
                {id:"TNG20", name:"Đừng Cố Làm Người Tốt Trong Mắt Tất Cả Mọi Người",cat:null,price:"108.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG20.jpeg"},
                {id:"TNG21", name:"Một Lần Tới Nhân Gian, Phải Sống Đời Rực Rỡ",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG21.jpeg"},
                {id:"TNG22", name:"Vì Mùa Xuân Nào Cũng Phải Trôi Đi",cat:null,price:"45.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG22.jpeg"},
                {id:"TNG23", name:"Gió Lạnh Đầu Mùa",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG23.jpeg"},
                {id:"TNG24", name:"Xin Chào Người Trân Quý",cat:null,price:"112.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG24.jpeg"},
    
            ]},
            {id:"TRD", name:"Truyện dài", quantity:0, books:[
                {id:"TRD1", name:"Ra Bờ Suối Ngắm Hoa Kèn Hồng",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD1.jpeg"},
                {id:"TRD2", name:"Cửa Tiệm Của Những Lá Thư",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD2.jpeg"},
                {id:"TRD3", name:"Út Quyên Và Tôi",cat:null,price:"35.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD3.jpeg"},
                {id:"TRD4", name:"Cảm Ơn Người Lớn",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD4.jpeg"},
                {id:"TRD5", name:"Thiên Thần Nhỏ Của Tôi",cat:null,price:"68.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD5.jpeg"},
                {id:"TRD6", name:"Bàn Có Năm Chỗ Ngồi",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD6.jpeg"},
                {id:"TRD7", name:"Phòng Trọ Ba Người",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD7.jpeg"},
                {id:"TRD8", name:"Ngôi Trường Mọi Khi",cat:null,price:"43.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD8.jpeg"},
                {id:"TRD9", name:"Quán Gò Đi Lên",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD9.jpeg"},
                {id:"TRD10", name:"Thằng Quỷ Nhỏ",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD10.jpeg"},
                {id:"TRD11", name:"Nữ Sinh",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD11.jpeg"},
                {id:"TRD12", name:"Buổi Chiều Windows",cat:null,price:"56.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD12.jpeg"},
                {id:"TRD13", name:"Đi Qua Hoa Cúc",cat:null,price:"56.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD13.jpeg"},
                {id:"TRD14", name:"Những Cô Em Gái",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD14.jpeg"},
                {id:"TRD15", name:"Những Chàng Trai Xấu Tính",cat:null,price:"43.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD15.jpeg"},
                {id:"TRD16", name:"Con Chim Xanh Biếc Bay Về",cat:null,price:"230.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD16.jpeg"},
                {id:"TRD17", name:"Trước Vòng Chung Kết",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD17.jpeg"},
                {id:"TRD18", name:"Hoa Hồng Xứ Khác",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD18.jpeg"},
                {id:"TRD19", name:"Bong Bóng Lên Trời",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD19.jpeg"},
                {id:"TRD20", name:"Bồ Câu Không Đưa Thư",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD20.jpeg"},
                {id:"TRD21", name:"Chú Bé Rắc Rối",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD21.jpeg"},
                {id:"TRD22", name:"Trại Hoa Vàng",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD22.jpeg"},
                {id:"TRD23", name:"Còn Chút Gì Để Nhớ",cat:null,price:"43.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD23.jpeg"},
                {id:"TRD24", name:"Làm Bạn Với Bầu Trời",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD24.jpeg"},
    
            ]},
            {id:"T", name:"Thơ", quantity:0, books:[
                {id:"T1", name:"Thơ Khát Vọng",cat:null,price:"100.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T1.jpeg"},
                {id:"T2", name:"Thơ Xuân Diệu",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T2.jpeg"},
                {id:"T3", name:"Thơ Tố Hữu",cat:null,price:"35.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T3.jpeg"},
                {id:"T4", name:"Thơ Hướng Dương",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T4.jpeg"},
                {id:"T5", name:"Khúc Ru Trầm (77 Ca Khúc Phổ Thơ Nguyễn Ngọc Hạnh)",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T5.jpeg"},
                {id:"T6", name:"Con Đường Thơ - Toàn Tập Thơ Khế Lêm",cat:null,price:"250.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T6.jpeg"},
                {id:"T7", name:"Đặng Đình Hưng Một Bến Lạ - Thơ Và Họa",cat:null,price:"450.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T7.jpeg"},
                {id:"T8", name:"Góc Sân Và Khoảng Trời",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T8.jpeg"},
                {id:"T9", name:"Tuyển Thơ Trần Đăng Khoa",cat:null,price:"125.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T9.jpeg"},
                {id:"T10", name:"Tác Phẩm Chọn Lọc - Văn Học Ấn Độ - Những Bài Thơ",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T10.jpeg"},
                {id:"T11", name:"Tủ Sách Đời Người - Thơ Ngụ Ngôn",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T11.jpeg"},
                {id:"T12", name:"Hoàng Cầm 100 Bài Thơ",cat:null,price:"116.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T12.jpeg"},
                {id:"T13", name:"Tinh Hoa Văn Chương Việt - Thơ Xuân Quỳnh",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T13.jpeg"},
                {id:"T14", name:"Hồ Xuân Hương Thơ Và Đời",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T14.jpeg"},
                {id:"T15", name:"Như Dải Phù Vân",cat:null,price:"126.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T15.jpeg"},
                {id:"T16", name:"Võ Quảng - Một Đời Thơ Văn - Ấn Bản Kỉ Niệm 100 Năm Ngày Sinh Nhà Văn Võ Quảng",cat:null,price:"180.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T16.jpeg"},
                {id:"T17", name:"Nguyễn Đình Chiểu Thơ Và Đời",cat:null,price:"87.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T17.jpeg"},
                {id:"T18", name:"Hàn Mặc Tử Thơ Và Đời",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T18.jpeg"},
                {id:"T19", name:"Nhớ (Thơ Song Ngữ)",cat:null,price:"42.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T19.jpeg"},
                {id:"T20", name:"Giai Nhân Di Mặc - Sự Tích Và Thơ Từ Hồ Xuân Hương",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T20.jpeg"},
                {id:"T21", name:"Nắng Thiên Đường",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T21.jpeg"},
                {id:"T22", name:"Dương Tường",cat:null,price:"108.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T22.jpeg"},
                {id:"T23", name:"Bỗng Nghe Vần 'Thắng' Vút Lên Cao - Thơ Hồ Chí Minh Và Những Lời Bình",cat:null,price:"168.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T23.jpeg"},
                {id:"T24", name:"Tuyển tập thơ cổ Trung Hoa (Tập 1 Tiên Tần)",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T24.jpeg"},
    
            ]},
            {id:"KH", name:"Khác", quantity:0, books:[

            ]},
            
        ]},
        {id:3, name:"Tiểu thuyết", quantity:0, listcategory: [
            {id:"NT", name:"Ngôn tình", quantity:0, books:[
                {id:"NT1", name:"Bến xe",cat:null,price:"76.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT1.jpeg"},
                {id:"NT2", name:"Thất tịch không mưa",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT2.jpeg"},
                {id:"NT3", name:"Bên nhau trọn đời",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT3.jpeg"},
                {id:"NT4", name:"Hãy nhắm mắt khi anh đến (tập 1)",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT4.jpeg"},
                {id:"NT5", name:"Hãy nhắm mắt khi anh đến (tập 2)",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT5.jpeg"},
                {id:"NT6", name:"Từng có người yêu tôi như sinh mệnh",cat:null,price:"118.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT6.jpeg"},
                {id:"NT7", name:"Anh có thích nước Mỹ không?",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT7.jpeg"},
                {id:"NT8", name:"Sẽ có thiên thần thay anh yêu em",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT8.jpeg"},
                {id:"NT9", name:"Hoá ra anh vẫn ở đây (tập 1)",cat:null,price:"74.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT9.jpeg"},
                {id:"NT10", name:"Hoá ra anh vẫn ở đây (tập 2)",cat:null,price:"74.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT10.jpeg"},
                {id:"NT11", name:"Yêu em từ cái nhìn đầu tiên",cat:null,price:"109.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT11.jpeg"},
                {id:"NT12", name:"All in love - Ngập tràn yêu thương",cat:null,price:"118.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT12.jpeg"},
                {id:"NT13", name:"Mãi mãi là bao xa",cat:null,price:"135.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT13.jpeg"},
                {id:"NT14", name:"Em sẽ đến cùng cơn mưa",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT14.jpeg"},
                {id:"NT15", name:"Rừng Na Uy",cat:null,price:"128.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT15.jpeg"},
                {id:"NT16", name:"Lấp Lánh",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT16.jpeg"},
                {id:"NT17", name:"Your Name",cat:null,price:"75.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT17.jpeg"},
                {id:"NT18", name:"Socrates In Love",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT18.jpeg"},
                {id:"NT19", name:"5 Centimet trên giây",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT19.jpeg"},
                {id:"NT20", name:"Khu vườn ngôn từ",cat:null,price:"95.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT20.jpeg"},
                {id:"NT21", name:"Tôi vẫn nghe tiếng em thầm gọi",cat:null,price:"52.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT21.jpeg"},
                {id:"NT22", name:"North and South",cat:null,price:"74.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT22.jpeg"},
                {id:"NT23", name:"Kiêu Hãnh và Định Kiến",cat:null,price:"95.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT23.jpeg"},
                {id:"NT24", name:"Me Before You",cat:null,price:"180.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT24.jpeg"},
    
            ]},
            {id:"GT", name:"Giả tưởng", quantity:0, books:[
                {id:"GT1", name:"Harry Potter (Trọn bộ)",cat:null,price:"1.550.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT1.jpeg"},
                {id:"GT2", name:"Chúa tể những chiếc nhẫn (Trọn bộ)",cat:null,price:"470.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT2.jpeg"},
                {id:"GT3", name:"The Hobbit (Anh chàng Hobbit)",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT3.jpeg"},
                {id:"GT4", name:"A Game of Thrones",cat:null,price:"270.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT4.jpeg"},
                {id:"GT5", name:"The Chronicles of Narnia (Trọn bộ)",cat:null,price:"307.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT5.jpeg"},
                {id:"GT6", name:"Dune - Xứ Cát",cat:null,price:"249.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT6.jpeg"},
                {id:"GT7", name:"Thần thoại Bắc Âu",cat:null,price:"96.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT7.jpeg"},
                {id:"GT8", name:"Eragon - Cậu bé cưỡi rồng",cat:null,price:"100.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT8.jpeg"},
                {id:"GT9", name:"Cỗ máy thời gian",cat:null,price:"68.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT9.jpeg"},
                {id:"GT10", name:"Tam Thể (Trọn bộ)",cat:null,price:"665.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT10.jpeg"},
                {id:"GT11", name:"Trạm tín hiệu số 23",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT11.jpeg"},
                {id:"GT12", name:"Liểu trai chí dị",cat:null,price:"226.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT12.jpeg"},
                {id:"GT13", name:"Rạp xiếc đêm",cat:null,price:"160.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT13.jpeg"},
                {id:"GT14", name:"Artemis Fowl (Trọn bộ)",cat:null,price:"1.050.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT14.jpeg"},
                {id:"GT15", name:"Outlander (Trọn bộ)",cat:null,price:"528.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT15.jpg"},
                {id:"GT16", name:"Đại Nam Dị Truyện",cat:null,price:"76.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT16.jpeg"},
                {id:"GT17", name:"Nơi khu rừng chạm tới những vì sao",cat:null,price:"179.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT17.jpeg"},
                {id:"GT18", name:"451 Độ F",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT18.jpeg"},
                {id:"GT19", name:"Xứ Sở Diệu Kỳ Tàn Bạo Và Chốn Tận Cùng Thế Giới",cat:null,price:"139.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT19.jpeg"},
                {id:"GT20", name:"Hai vạn dặm dưới đáy biển",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT20.jpeg"},
                {id:"GT21", name:"Cô thành trong gương",cat:null,price:"218.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT21.jpeg"},
                {id:"GT22", name:"Hố",cat:null,price:"62.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT22.jpeg"},
                {id:"GT23", name:"Quán canh bò hầm của kẻ cắp quá khứ",cat:null,price:"216.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT23.jpeg"},
                {id:"GT24", name:"Xứ Tháng Mười",cat:null,price:"219.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT24.jpeg"},
    
            ]},
            {id:"TTLS", name:"Tiểu thuyết Lịch sử", quantity:0, books:[
                {id:"LS1", name:"Những người khốn khổ (Trọn bộ)",cat:null,price:"390.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS1.jpg"},
                {id:"LS2", name:"Chiến Tranh và Hoà Bình (Trọn bộ)",cat:null,price:"395.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS2.jpeg"},
                {id:"LS3", name:"Bá tước Monte Cristo",cat:null,price:"590.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS3.jpeg"},
                {id:"LS4", name:"Don Quixote (Trọn bộ)",cat:null,price:"263.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS4.jpeg"},
                {id:"LS5", name:"Tam Quốc Diễn Nghĩa (Trọn bộ)",cat:null,price:"540.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS5.jpeg"},
                {id:"LS6", name:"Thuỷ hử (Trọn bộ)",cat:null,price:"330.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS6.jpeg"},
                {id:"LS7", name:"Lâu đài sói",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS7.jpeg"},
                {id:"LS8", name:"Thông reo Ngàn Hống",cat:null,price:"140.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS8.jpeg"},
                {id:"LS9", name:"Lệ Chi",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS9.png"},
                {id:"LS10", name:"Fall of Giants",cat:null,price:"390.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS10.jpeg"},
                {id:"LS11", name:"Winter of the World",cat:null,price:"204.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS11.jpeg"},
                {id:"LS12", name:"Edge of Eternity",cat:null,price:"258.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS12.jpeg"},
                {id:"LS13", name:"Trần Nhật Duật",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS13.jpeg"},
                {id:"LS14", name:"Thiên Mệnh",cat:null,price:"160.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS14.jpeg"},
                {id:"LS15", name:"Hồ Quý Ly",cat:null,price:"280.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS15.jpeg"},
                {id:"LS16", name:"Lý Đào Lang Vương",cat:null,price:"170.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS16.jpeg"},
                {id:"LS17", name:"Nam Đế Vạn Xuân",cat:null,price:"140.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS17.jpeg"},
                {id:"LS18", name:"Nam Quốc Sơn Hà",cat:null,price:"240.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS18.jpeg"},
                {id:"LS19", name:"Tiêu Sơn Tráng Sĩ",cat:null,price:"286.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS19.jpeg"},
                {id:"LS20", name:"Nghĩa địa Praha",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS20.jpeg"},
    
            ]},

        ]},
        {id:4, name:"Kinh tế", quantity:0, listcategory: [
            {id:"QT", name:"Quản trị", quantity:0, books:[
                {id:"QT1", name:"Quản Trị Nhân Sự Thông Minh Bằng Dữ Liệu",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT1.jpeg"},
                {id:"QT2", name:"Quản Trị Công Ty Khởi Nghiệp",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT2.jpeg"},
                {id:"QT3", name:"Quản Trị Tinh Gọn - Quản Trị Doanh Nghiệp, Quản Trị Cuộc Đời",cat:null,price:"148.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT3.jpeg"},
                {id:"QT4", name:"Quản Trị Nguồn Nhân Lực LOGISTISC Ở Việt Nam",cat:null,price:"238.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT4.png"},
                {id:"QT5", name:"Quản Trị Dự Án - Những Nguyên Tắc Căn Bản",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT5.jpeg"},
                {id:"QT6", name:"Quản Trị Nhân Sự Đúng ",cat:null,price:"239.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT6.jpeg"},
                {id:"QT7", name:"Quản Trị Dự Án",cat:null,price:"199.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT7.jpeg"},
                {id:"QT8", name:"Quản Trị Trong Thời Khủng Hoảng",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT8.jpeg"},
                {id:"QT9", name:"Quản Trị Chuỗi Cung Ứng - Những Phương Pháp Hay Nhất",cat:null,price:"199.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT9.jpeg"},
                {id:"QT10", name:"Quản Trị Học - Tóm Tắt Lý Thuyết Và Câu Hỏi Trắc Nghiệm",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT10.jpeg"},
                {id:"QT11", name:"Quản Trị Tài Chính",cat:null,price:"590.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT11.jpeg"},
                {id:"QT12", name:"Quản Trị Nông Nghiệp 4.0",cat:null,price:"400.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT12.jpeg"},
                {id:"QT13", name:"Quản Trị Doanh Nghiệp Trong Thời Đại Mới - Thành Công Có Ý Nghĩa",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT13.jpeg"},
                {id:"QT14", name:"Cẩm Nang Quản Trị Điều Hành - Quản Trị Vi Mô",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT14.jpeg"},
                {id:"QT15", name:"OKR - 'Kinh Thánh' Quản Trị Và Cách Vận Hành Hiệu Quả",cat:null,price:"134.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT15.jpeg"},
                {id:"QT16", name:"Nguyên Lý Quản Trị Chuỗi Cung Ứng",cat:null,price:"199.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT16.jpeg"},
                {id:"QT17", name:"Tinh Hoa Quản Trị Dự Án Dành Cho Quản Lý Dự Án Không Chuyên ",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT17.png"},
                {id:"QT18", name:"Cẩm Nang Quản Trị Điều Hành - Quản Trị Tích Hợp",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT18.jpeg"},
                {id:"QT19", name:"Kiểm Soát Quản Trị - Corporate Governance",cat:null,price:"375.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT19.jpeg"},
                {id:"QT20", name:"Những Ảo Tưởng Quản Trị địa Praha",cat:null,price:"136.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT20.png"},
    
            ]},
            {id:2, name:"Marketing", quantity:0, books:[
                {id:33, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Nhân Vật", quantity:0, books:[
                {id:34, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:4, name:"Khởi nghiệp", quantity:0, books:[
                {id:35, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:5, name:"Chứng khoán", quantity:0, books:[
                {id:36, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]},
        {id:5, name:"Tâm lý/Kỹ năng sống", quantity:0, listcategory: [
            {id:1, name:"Tâm lý", quantity:0, books:[
                {id:37, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Kỹ năng sống", quantity:0, books:[
                {id:38, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Hạt giống tâm hồn", quantity:0, books:[
                {id:39, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]},
        {id:6, name:"Lịch sử", quantity:0, listcategory: [
            {id:1, name:"Lịch sử Việt Nam", quantity:0, books:[
                {id:40, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Lịch sử Nước ngoài", quantity:0, books:[
                {id:41, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]},
        {id:7, name:"Thiếu nhi", quantity:0, listcategory: [
            {id:1, name:"Truyện thiếu nhi", quantity:0, books:[
                {id:42, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Tô màu", quantity:0, books:[
                {id:43, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Luyện chữ", quantity:0, books:[
                {id:44, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]}
    ];
    localStorage.setItem('category', JSON.stringify(category));
    updateQuantity(category);
}
function createBestSeller() {
    var bestseller = [];
    var category = JSON.parse(localStorage.getItem('category'));
    bestseller.push(category[0].listcategory[0].books[5]); // Giáo dục.Sách giáo khoa.Sách 6
    bestseller.push(category[0].listcategory[1].books[0]); // Giáo dục.Sách tham khảo.Sách 1
    bestseller.push(category[0].listcategory[2].books[0]); // Giáo dục.Từ điển.Sách 1
    bestseller.push(category[1].listcategory[0].books[0]); // Văn học.Truyện ngắn.Sách 1
    bestseller.push(category[1].listcategory[1].books[0]); // Văn học.Truyện dài.Sách 1
    bestseller.push(category[1].listcategory[2].books[0]); // Văn học.Thơ.Sách 1
    bestseller.push(category[1].listcategory[3].books[0]); // Văn học.Khác.Sách 1
    bestseller.push(category[3].listcategory[0].books[0]); // Kinh tế.Quản trị.Sách 1
    bestseller.push(category[3].listcategory[1].books[0]); // Kinh tế.Marketing.Sách 1
    bestseller.push(category[3].listcategory[2].books[0]); // Kinh tế.Nhân vật.Sách 1
    bestseller.push(category[3].listcategory[3].books[0]); // Kinh tế.Khởi nghiệp.Sách 1
    bestseller.push(category[3].listcategory[4].books[0]); // Kinh tế.Chứng khoán.Sách 1
    bestseller.push(category[4].listcategory[0].books[0]); // Tâm lý.Tâm lý.Sách 1
    bestseller.push(category[4].listcategory[1].books[0]); // Tâm lý.Kỹ năng sống.Sách 1
    bestseller.push(category[4].listcategory[2].books[0]); // Tâm lý.Hạt giống tâm hồn.Sách 1
    bestseller.push(category[5].listcategory[0].books[0]); // Lịch sử.Lịch sử Việt Nam.Sách 1
    localStorage.setItem('bestseller', JSON.stringify(bestseller));
}
function addBill() {
    // cái này từ từ e tìm hiểu :))
}
function updateQuantity(category) {
    var category = JSON.parse(localStorage.getItem('category'));
    // Tính số sách mỗi loại trước
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            var a = 0;
            for (var h = 0; h < category[i].listcategory[j].books.length; h++) {
                a += (category[i].listcategory[j].books[h].quantity);
            }
            category[i].listcategory[j].quantity = a;
        }
    }
    // Tính số sách mỗi category
    for (var i  = 0; i < category.length; i++) {
        var a = 0;
        for (var j = 0; j < category[i].listcategory.length; j++) {
            a += (category[i].listcategory[j].quantity);
        }
        category[i].quantity = a;
    }
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            for (var h = 0; h < category[i].listcategory[j].books.length; h++) {
                category[i].listcategory[j].books[h].cat = (category[i].listcategory[j].name);
            }
        }
    }
    localStorage.setItem('category', JSON.stringify(category));
}
function renderBestseller() {
    document.getElementById("headline").innerHTML = '<h3>Sản phẩm bán chạy</h3>';
    var bestseller = JSON.parse(localStorage.getItem('bestseller'));
    var html = '';
    for (var i = 0; i < bestseller.length; i++) {
        html += '<li>';
        html += '<div class="product-item">';
        html += '<div class="product-top">';
        html += '<a class="product-thumb">';
        html += '<img src="' + bestseller[i].image + '" alt="">';
        html += '</a>';
        html += '<a class="buynow">Mua Ngay</a>';
        html += '</div>';
        html += '<div class="product-info">';
        html += '<a class="product-cat">' + bestseller[i].cat + '</a>';
        html += '<a class="product-name">' + bestseller[i].name + '</a>';
        html += '<div class="product-price">' + bestseller[i].price + '</div>'
        html += '</div>';
        html += '</div>';
        html += '</li>'
    }
    document.getElementById("products").innerHTML = html;
    showdetailBestseller(bestseller);
}
function backFromDiv() {
    document.getElementById("container").style.display = "none";
    document.getElementById("wrapper").style.display = "none";
}
function sub(quantity) {
    var a = document.getElementById('quantity').value;
    if (a > 1) {
        a--;
        document.getElementById('plus').disabled = false;
        document.getElementById('sub').disabled = false;
        document.getElementById('quantity').value =a;
    } else {
        document.getElementById('quantity').value = 0;
        document.getElementById('plus').disabled = false;
        document.getElementById('sub').disabled = true;
    }
}
function plus(quantity) {
    var a = document.getElementById('quantity').value;
    if (a == quantity - 1) {
        a++;
        document.getElementById('sub').disabled = false;
        document.getElementById('plus').disabled = true;
        document.getElementById('quantity').value = quantity;
    } else {
        a++;
        document.getElementById('quantity').value = a;
        document.getElementById('plus').disabled = false;
        document.getElementById('sub').disabled = false;
    }
}
function checkQuatity(quantity) {
    var a = document.getElementById('quantity').value;
    if (a <= 0 || isNaN(a)) { // phai nhap so, isNaN la ki tu
        document.getElementById('quantity').value = 0;
        document.getElementById('sub').disabled = true;
        document.getElementById('plus').disabled = false;
    } else {
        if (a >= quantity) {
            document.getElementById('plus').disabled = true;
            document.getElementById('sub').disabled = false;
            document.getElementById('quantity').value = quantity;
        } else {
            document.getElementById('plus').disabled = false;
            document.getElementById('sub').disabled = false;
        }
    }
}
function showdetailBestseller(products) {
    let listproduct = document.querySelectorAll("#products li");
    for (let i = 0; i < listproduct.length; i++) {
        listproduct[i].addEventListener('click', () => {
            var html = '';
            html += '<img src="' + products[i].image + '" alt="">';
            html += '<div id="detail-pro">';
            html += '<ul>';
            html += '<li><h1>' + products[i].name + '</h1></li>';
            html += '<hr>';
            html += '<li>Thể loại: <h3>' + products[i].cat + '</h3></li>';
            html += '<hr>';
            html += '<li>Giá: <h3>' + products[i].price + '</h3></li>';
            html += '<hr>';
            if (products[i].quantity > 0) {
                html += '<li style="color:blue; font-size:80%"><h4>Còn hàng: ' + products[i].quantity + ' sản phẩm</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" onchange="checkQuatity(' + products[i].quantity + ')">';
                html += '<input type="button" value="+" id="plus" onclick="plus(' + products[i].quantity + ')">';
    
            } else {
                html += '<li><h4>Hết hàng</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" disabled>';
                html += '<input disabled type="button" value="+" id="plus" onclick="plus(' + products[i].quantity + ')">';
    
            }
            html += '</li>';
            html += '<li id="addtocart" onclick="addToCart()">';
            html += '<div><i class="fas fa-solid fa-cart-shopping" title="Giỏ hàng"></i></div>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            document.getElementById("detail").innerHTML = html;
            document.getElementById("wrapper").style.display = "block";
            document.getElementById("container").style.display = "block";
        });
    }
}
let currenPage;
let perPage = 8;
let start;
let end;
let totalpage;
let books=[];
function getCurrentPage(currenPage,products) {
    start = (currenPage - 1) * perPage;
    end = currenPage * perPage;
    if (end > products.length)
        end = products.length;
}
function changeButton() {
    if (currenPage < totalpage || currenPage > 1) {
        document.getElementById("btnext").className = "button-prev-next-active";
        document.getElementById("btprev").className = "button-prev-next-active";
    }
    if (currenPage == 1) {
        document.getElementById("btprev").className = "button-prev-next";
    }
    if (currenPage == totalpage) {
        document.getElementById("btnext").className = "button-prev-next";
    }
    const listPage = document.querySelectorAll(".number-page li");
    listPage[currenPage - 1].id = "active";
    for (let j = 0; j < listPage.length; j++) {
        if (j != (currenPage - 1)) {
            listPage[j].id = null;
        }
    }
}
function loadPage() {
    var str = window.location.href;
    str = str.split('?');
    var url = str[1].split('&');
    var products = JSON.parse(localStorage.getItem('category'));
    if (url.length > 1) {
        if (url[0] == "giaoduc" && url[1] == "sachgiaokhoa") {
            document.getElementById("headline").innerHTML = "<h3>Sách giáo khoa</h3>";
            books = products[0].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "giaoduc" && url[1] == "sachthamkhao") {
            document.getElementById("headline").innerHTML = "<h3>Sách tham khảo</h3>";
            books = products[0].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "giaoduc" && url[1] == "tudien") {
            document.getElementById("headline").innerHTML = "<h3>Từ điển</h3>";
            books = products[0].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "truyenngan") {
            document.getElementById("headline").innerHTML = "<h3>Truyện ngắn</h3>";
            books = products[1].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "truyendai") {
            document.getElementById("headline").innerHTML = "<h3>Truyện dài</h3>";
            books = products[1].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "tho") {
            document.getElementById("headline").innerHTML = "<h3>Thơ</h3>";
            books = products[1].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "khac") {
            document.getElementById("headline").innerHTML = "<h3>Văn học Khác</h3>";
            books = products[1].listcategory[3].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tieuthuyet" && url[1] == "ngontinh") {
            document.getElementById("headline").innerHTML = "<h3>Tiểu thuyết Ngôn tình</h3>";
            books = products[2].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tieuthuyet" && url[1] == "giatuong") {
            document.getElementById("headline").innerHTML = "<h3>Tiểu Thuyết Giả tưởng</h3>";
            books = products[2].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tieuthuyet" && url[1] == "lichsu") {
            document.getElementById("headline").innerHTML = "<h3>Tiểu thuyết lịch sử</h3>";
            books = products[2].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "quantri") {
            document.getElementById("headline").innerHTML = "<h3>Sách Quản trị</h3>";
            books = products[3].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "marketing") {
            document.getElementById("headline").innerHTML = "<h3>Sách Marketing</h3>";
            books = products[3].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "nhanvat") {
            document.getElementById("headline").innerHTML = "<h3>Sách Nhân Vật</h3>";
            books = products[3].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "khoinghiep") {
            document.getElementById("headline").innerHTML = "<h3>Sách Khởi nghiệp</h3>";
            books = products[3].listcategory[3].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "chungkhoan") {
            document.getElementById("headline").innerHTML = "<h3>Sách Chứng khoán</h3>";
            books = products[3].listcategory[4].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tamly/kynangsong" && url[1] == "tamly") {
            document.getElementById("headline").innerHTML = "<h3>Sách Tâm lý</h3>";
            books = products[4].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tamly/kynangsong" && url[1] == "kynangsong") {
            document.getElementById("headline").innerHTML = "<h3>Sách Kỹ năng sống</h3>";
            books = products[4].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tamly/kynangsong" && url[1] == "hatgiongtamhon") {
            document.getElementById("headline").innerHTML = "<h3>Sách Hạt giống tâm hồn</h3>";
            books = products[4].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "lichsu" && url[1] == "vietnam") {
            document.getElementById("headline").innerHTML = "<h3>Lịch sử Việt Nam</h3>";
            books = products[5].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "lichsu" && url[1] == "nuocngoai") {
            document.getElementById("headline").innerHTML = "<h3>Lịch sử Nước ngoài</h3>";
            books = products[5].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "truyenthieunhi") {
            document.getElementById("headline").innerHTML = "<h3>Truyện thiếu nhi</h3>";
            books = products[6].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "tomau") {
            document.getElementById("headline").innerHTML = "<h3>Sách Tô màu</h3>";
            books = products[6].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "luyenchu") {
            document.getElementById("headline").innerHTML = "<h3>Sách Luyện chữ</h3>";
            books = products[6].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "luyenchu") {
            document.getElementById("headline").innerHTML = "<h3>Sách Luyện chữ</h3>";
            books = products[6].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
    }else{
        if (url[0]=="giaoduc"){
            document.getElementById("headline").innerHTML = "<h3>Sách Giáo dục</h3>";
            for (var j = 0; j < products[0].listcategory.length; j++) {
                for (var h = 0; h < products[0].listcategory[j].books.length; h++) {
                    books.push(products[0].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="vanhoc"){
            document.getElementById("headline").innerHTML = "<h3>Sách Văn học</h3>";
            for (var j = 0; j < products[1].listcategory.length; j++) {
                for (var h = 0; h < products[1].listcategory[j].books.length; h++) {
                    books.push(products[1].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="tieuthuyet"){
            document.getElementById("headline").innerHTML = "<h3>Sách Tiểu thuyết</h3>";
            for (var j = 0; j < products[2].listcategory.length; j++) {
                for (var h = 0; h < products[2].listcategory[j].books.length; h++) {
                    books.push(products[2].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="kinhte"){
            document.getElementById("headline").innerHTML = "<h3>Sách Kinh tế</h3>";
            for (var j = 0; j < products[3].listcategory.length; j++) {
                for (var h = 0; h < products[3].listcategory[j].books.length; h++) {
                    books.push(products[3].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="tamly/kynangsong"){
            document.getElementById("headline").innerHTML = "<h3>Sách Tâm lý/Kỹ năng sống</h3>";
            for (var j = 0; j < products[3].listcategory.length; j++) {
                for (var h = 0; h < products[3].listcategory[j].books.length; h++) {
                    books.push(products[3].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="lichsu"){
            document.getElementById("headline").innerHTML = "<h3>Sách Lịch sử</h3>";
            for (var j = 0; j < products[4].listcategory.length; j++) {
                for (var h = 0; h < products[4].listcategory[j].books.length; h++) {
                    books.push(products[4].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="thieunhi"){
            document.getElementById("headline").innerHTML = "<h3>Sách Thiếu nhi</h3>";
            for (var j = 0; j < products[5].listcategory.length; j++) {
                for (var h = 0; h < products[5].listcategory[j].books.length; h++) {
                    books.push(products[5].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
    }
}
function renderProduct(products) {
    var html = '';
    for (var i = start; i < end; i++) {
        html += '<li>';
        html += '<div class="product-item">';
        html += '<div class="product-top">';
        html += '<a class="product-thumb">';
        html += '<img src="' + products[i].image + '" alt="">';
        html += '</a>';
        html += '<a class="buynow">Mua Ngay</a>';
        html += '</div>';
        html += '<div class="product-info">';
        html += '<a class="product-cat">' + products[i].cat + '</a>';
        html += '<a class="product-name">' + products[i].name + '</a>';
        html += '<div class="product-price">' + products[i].price + '</div>'
        html += '</div>';
        html += '</div>';
        html += '</li>'
    }
    document.getElementById("products").innerHTML = html;
    showDetail(products);
}
function changePage(books) {
    const listPage = document.querySelectorAll(".number-page li");
    console.log(listPage);
    for (let i = 0; i < listPage.length; i++) {
        listPage[i].addEventListener('click',() => {
            var value = i + 1;
            console.log(value);
            currenPage = value;
            changeButton();
            getCurrentPage(currenPage,books);
            renderProduct(books);
        });
    }
}
function renderListPage() {
    var html = '';
    html += '<li id="btprev" class="button-prev-next"><i class="fas fa-chevron-circle-left" onclick="prevButton()"></i></li>';
    html += '<div class="number-page" id="number-page">'
    html += '<li id="active"><b>' + 1 + '</b></li>';
    for (var i = 2; i <= totalpage; i++) {
        html += '<li><b>' + i + '</b></li>';
    }
    html += '</div>';
    html += '<li id="btnext" class="button-prev-next-active"><i class="fas fa-chevron-circle-right" onclick="nextButton()"></i></li>'
    document.getElementById("page").innerHTML = html;
}
function nextButton() {
    currenPage++;
    if (currenPage > totalpage)
        currenPage = totalpage
    changeButton();
    getCurrentPage(currenPage,books);
    renderProduct(books);
}
function prevButton() {
    currenPage--;
    if (currenPage < 1)
        currenPage = 1
    changeButton();
    getCurrentPage(currenPage,books);
    renderProduct(books);
}
function showDetail(products) {
    let listproduct = document.querySelectorAll("#products li");
    for (let i = 0; i < listproduct.length; i++) {
        listproduct[i].addEventListener('click', () => {
            getCurrentPage(currenPage, products);
            var html = '';
            html += '<img src="' + products[i + start].image + '" alt="">';
            html += '<div id="detail-pro">';
            html += '<ul>';
            html += '<li><h1>' + products[i + start].name + '</h1></li>';
            html += '<hr>';
            html += '<li>Thể loại: <h3>' + products[i + start].cat + '</h3></li>';
            html += '<hr>';
            html += '<li>Giá: <h3>' + products[i + start].price + '</h3></li>';
            html += '<hr>';
            if (products[i + start].quantity > 0) {
                html += '<li style="color:blue; font-size:80%"><h4>Còn hàng: ' + products[i + start].quantity + ' sản phẩm</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i + start].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" onchange="checkQuatity(' + products[i + start].quantity + ')">';
                html += '<input type="button" value="+" id="plus" onclick="plus(' + products[i + start].quantity + ')">';
    
            } else {
                html += '<li><h4>Hết hàng</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i + start].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" disabled>';
                html += '<input disabled type="button" value="+" id="plus" onclick="plus(' + products[i + start].quantity + ')">';
    
            }
            html += '</li>';
            html += '<li id="addtocart" onclick="addToCart()">';
            html += '<div><i class="fas fa-solid fa-cart-shopping" title="Giỏ hàng"></i></div>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            document.getElementById("detail").innerHTML = html;
            document.getElementById("wrapper").style.display = "block";
            document.getElementById("container").style.display = "block";
        })
    }
}