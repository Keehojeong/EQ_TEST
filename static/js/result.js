// 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('8017bf44ad4997f0fb9f0645dd300a3d');


// 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
function send(number) {	
	Kakao.Link.createDefaultButton({
		container: '#kakao-link-btn',
		objectType: 'feed',
		content: {
			title: '나만의 공부법 찾기',
			description: '#청각형 #시각형 #신체 감각형 #학습 스타일',
			imageUrl: 'https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png',
			link: {
				webUrl: 'https://developers.kakao.com/',
				}
		},
		social: {
			likeCount: 286,
			commentCount: 45,
			sharedCount: 845
		},
		buttons: [
			{
				title: '결과보러가기',
				link: {
					webUrl: 'http://127.0.0.1:5500/WebContent/result' + number + '.html'
				}
			}
		]
	});
}