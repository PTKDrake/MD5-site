$(document).ready(() => {
    $(".hash-calc").on('click', () => {
        $.get("hash/string", {
            text: $("#input-text").val()
        }, (data, status) => {
            if (status === 'success')
                $("#hash-output").val(data.hash);
        });
    });

    $("#input-file").on('change', (event) => {
        const file = event.target.files[0];
        if(file) {
            const formData = new FormData();
            formData.append("file", file);

            $.ajax({
                url: "hash/file",
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: (data) => {
                    $("#hash-output").val(data.hash);
                },
                complete: () => {
                    $("#input-file").val("");
                }
            });
        }
    });

    $(".hash-compare").on('click', () => {
        $("#text-compare-result").text("");
        $.ajax({
            url: 'hash/string',
            method: 'GET',
            data: {
                text: $("#text-compare-input1").val()
            },
            success: (data, status) => {
                if (status === 'success')
                    $("#text-compare-output1").val(data.hash);
            },
            complete: () => {
                $.ajax({
                    url: 'hash/string',
                    method: 'GET',
                    data: {
                        text: $("#text-compare-input2").val()
                    },
                    success: (data, status) => {
                        if (status === 'success')
                            $("#text-compare-output2").val(data.hash);
                    },
                    complete: () => {
                        if($("#text-compare-output1").val() == $("#text-compare-output2").val())
                            $("#text-compare-result").text("Hai chuỗi có cùng hash MD5.");
                        else
                            $("#text-compare-result").text("Hai chuỗi không có cùng hash MD5.");
                    }
                })
            }
        })
    });
});