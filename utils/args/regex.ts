export default {
  flag: /(^\-[a-z]{1}$)/,
  shortFlag: /(^\--[a-z-]+$)/,
	method: /^(GET|POST|PUT|PATH|DELETE)$/,
	url: /^((http(s?)\:\/\/|www\.)?)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[:\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w?=-]*))?)$/
}