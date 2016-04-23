$(document).ready(function() {
    var tableJSON = (function (win, doc, undef) {
            var _page = 1,              // 设置请求第几页表单
                _gottenPageNum = 0,     // 计算当前已经得到了多少页表单
                _maxPageNum = 5,        // 保存表单页数
                url = 'http://localhost:3000/',
                tableData = [],         // 保存表单数据
                bodyContent = document.body.innerHTML;

            function _setPage(page) {
                _page = page;
                return this;
            }

            function _setMaxPageNum(pages) {
                _maxPageNum = pages;
                return this;
            }

            function _getJSON() {
                $.ajax({
                    url: url + _page,
                    type: 'get',
                    dataType: 'json',
                    success: function (data) {
                        if(data) {
                            // 将请求得到的某一页表单保存至数组中
                            tableData = tableData.concat(data);
                            _gottenPageNum++;
                        } else {
                            console.error('获取数据失败');
                        }

                        if (_gottenPageNum === _maxPageNum) {
                            // 当表单分页全部请求完毕,开始渲染单页表单
                            $('#demo').DataTable({
                                data: tableData,
                                    columns: [
                                        { data: 'name'},
                                        { data: 'position'},
                                        { data: 'salary'},
                                        { data: 'office'}
                                    ],
                                    paging: false,
                                    retrieve:true,
                                    destroy:true
                            });

                            // 打印单页表单
                            $('input').remove();
                            $('#demo_filter').remove();
                            $('#demo').css('display', 'block');
                            window.print();
                            // 将计数器重新置0
                            _gottenPageNum = 0;
                            // 还原网站页面
                            document.body.ML = bodyContent;
                            document.location.reload();
                        }
                    },
                    error: function () {
                        console.log('获取数据失败');
                    }
                });

                return this;
            }

            return {
                reqJSON: function (page) {
                    _setPage(page);
                    _getJSON();

                    return this;
                }
            };
        }(window, document)),
        buttonHandle = function () {
            for (i = 1;i <= 5;i++) {
                tableJSON.reqJSON(i);
            }
        };

    $('.print').click(buttonHandle);
});


    // $.ajax({
    //     url: 'http://localhost:3000/2/',
    //     type: 'get',
    //     dataType: 'json',
    //     success: function (data) {
    //         $('#demo').DataTable({
    //             // data: data,
    //             // columns: [
    //             //     { data: 'name'},
    //             //     { data: 'position'},
    //             //     { data: 'salary'},
    //             //     { data: 'office'}
    //             // ],
    //             dom: 'Bfrtip',
    //             buttons: [
    //                 'print', 'excel', 'pdf'
    //             ],
    //             "sPaginationType" : "full_numbers",
    //             "oLanguage" : {
    //                 "sLengthMenu": "每页显示 _MENU_ 条记录",
    //                 "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
    //                 "sInfoEmpty": "没有数据",
    //                 "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
    //                 "sZeroRecords": "没有检索到数据",
    //                 "sSearch": "名称:",
    //                 "oPaginate": {
    //                     "sFirst": "首页",
    //                     "sPrevious": "前一页",
    //                     "sNext": "后一页",
    //                     "sLast": "尾页"
    //                 }
    //             },
    //             retrieve:true,
    //             destroy:true
    //         });
    //     },
    //     error: function () {
    //         console.log('error');
    //     }
    // });
