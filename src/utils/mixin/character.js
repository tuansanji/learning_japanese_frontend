export function compareChapters(a, b) {
  // Kiểm tra xem chuỗi a có chứa chữ số hay không.
  let hasNumberA = /\d+/.test(a);
  // Kiểm tra xem chuỗi b có chứa chữ số hay không.
  let hasNumberB = /\d+/.test(b);
  // Lấy chỉ số chương từ chuỗi.
  if (hasNumberA && hasNumberB) {
    let chapterA = Number(a.match(/\d+/)[0]);
    let chapterB = Number(b.match(/\d+/)[0]);

    if (chapterA < chapterB) {
      return -1;
    } else if (chapterA > chapterB) {
      return 1;
    } else {
      return 0;
    }
  } else if (hasNumberA) {
    // Nếu chỉ a có chứa chữ số, đặt a trước b.
    return -1;
  } else if (hasNumberB) {
    // Nếu chỉ b có chứa chữ số, đặt b trước a.
    return 1;
  } else {
    return 0;
  }
}
