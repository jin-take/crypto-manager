export const formatJSTDate = (dateStr: string): string => {
    const date = new Date(dateStr);
  
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
  
    const formatted = new Intl.DateTimeFormat('ja-JP', options).format(date);
  
    const [ymd, hms] = formatted.split(' ');
    const [year, month, day] = ymd.split('/');
    const [hour, minute, second] = hms.split(':');
  
    return `${year}年${month}月${day}日 ${hour}時${minute}分${second}秒（JST）`;
  };
  