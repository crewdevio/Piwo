/**
 * Copyright (c) Crew Dev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export default {
  flag: /(^\-[a-z]{1}$)/,
  shortFlag: /(^\--[a-z-]+$)/,
	method: /^(GET|POST|PUT|PATH|DELETE)$/,
	url: /^((http(s?)\:\/\/|www\.)?)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[:\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w?=-]*))?)$/
}