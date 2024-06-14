/** 태그를 삭제하고 텍스트만 반환하는 함수
 * @param {string} textWithTag
 * @returns {string}
 */
export const removeTag = textWithTag => textWithTag.replace(/(<([^>]+)>)/gi, '');
export const autoComChangeTag = textWithTag => textWithTag.replace(/¶HS¶/gi, "<span style='color:rgb(13, 186, 200);'>").replace(/¶HE¶/gi, '</span>');

export function debounce(func, wait, immediate) {
  let timeout;

  return function (...args) {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
