const scroll = () => {
  const msgTop = document.querySelectorAll('._customer_message_div');
  const messageList = document.querySelectorAll('.scroll_style_messenger > div');

  if (messageList.length > 1) {
    if (messageList[messageList.length - 2].getAttribute('name').includes('bot_')) {
      // console.log('scroll bottom!!!!');
      document.getElementById('scrollToElement').scrollTo({
        top: document.getElementById('scrollToElement').scrollHeight,
        behavior: 'smooth',
      });
    } else if (msgTop.length > 0) {
      // console.log('scroll focus user!!!!');
      document.getElementById('scrollToElement').scrollTo({
        top: msgTop[msgTop.length - 1].offsetTop - 20,
        behavior: 'smooth',
      });
    }
  } else {
    // console.log('scroll top!!!!');
    document.getElementById('scrollToElement').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

export default scroll;
