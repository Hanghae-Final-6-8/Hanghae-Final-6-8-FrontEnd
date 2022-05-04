# FrontEnd

항해 6기 D반 8조 실전프로젝트

<br>

## 🏄‍♂️팀원

<table>
  <tr>
    <td align="center"><a href="https://github.com/JuhwanLeeKR" target='_blank'><img src="https://avatars.githubusercontent.com/u/87694150?v=4" width="120px" /></a></td>
    <td align="center"><a href="https://github.com/cpk0709" target='_blank'><img src="https://avatars.githubusercontent.com/u/48235884?v=4" width="120px" /></a></td>
   
  </tr>
  <tr>
    <td align="center" vertical-align='middle'><strong>이주환</strong></td>
    <td align="center"><strong>최필경</strong></td>
    
  </tr>
  <tr>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
  </tr>
    <tr>
      <td align="center"><a href="https://github.com/JuhwanLeeKR" target='_blank'>github</a></td>
    <td align="center"><a href="https://github.com/cpk0709" target='_blank'>github</a></td>
  </tr>
</table>

### 📬커밋 종류

> 수정한 종류에 따라 커밋 메시지를 선택

| 메시지명 | 설명                                                     |
| -------- | -------------------------------------------------------- |
| add      | 파일 추가                                                |
| edit     | 코드 수정                                                |
| delete   | 파일 삭제                                                |
| feat     | 새로운 기능 추가 관련                                    |
| fix      | 버그 수정                                                |
| test     | 테스트 코드, 리팩토링 테스트 코드 추가                   |
| refactor | 코드 리팩토링(기능향상)                                  |
| chore    | 빌드 업무 수정, 패키지 매니저 수정                       |
| docs     | 문서 수정(md, git관련 파일, 이미지파일 수정)             |
| style    | 코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우 |

#### 📍형식 : git commit -m "${ name } ${ option } : [ #issue ] ${ comment }"

```
예) git commit -m "이주환 fix : #7 Axios baseURL 설정 문제 해결"
예) git commit -m "최필경 feat : 카카오 maps API 개발(ing)"
```

### 📢관련 이슈

> 작성한 커밋과 관련된 이슈 번호를 매핑

- 이슈 번호뒤에 아래에 써놓은 명령어를 붙여서 커밋 날리면 자동으로 이슈가 close 된다.  
  `close / closes / closed / fix / fixes / fixed / resolve /resolves / resolved`

```
< 예시 >
[FE] feat: axios close #1
```

### 🔐보안 관련

- **(중요)** 어떠한 KEY값이나 DB 접속 정보가 포함된 커밋을 날리지 않는다.
- 한 번이라도 날리면 커밋 로그가 남아서 보안에 취약하기 때문~
- 환경변수나 json/gitignore 등의 방식을 사용해서 원격 repo에는 절대 올리지 않는다.

<br>

## 🌳Branch / PR / Issue 규칙

### Branch

- 'main' 브랜치에서는 문서 작업 외에는 작업하지 않는다.
- 각자 브랜치에서 작업을 하고 dev에서 merge한다.
- 테스트 브랜치나 더이상 안쓰는 브랜치는 삭제한다.

### Pull Request

- 'dev' -> 'main' 브랜치에만 PULL REQUEST 한다.
- 자신이 계획한 기능이 완료됐을 경우에만 PR 작성
- 팀원과 협의 후 PR을 작성하며 독자적으로 PR 생성 후 merge하지 않는다.
- 간단하게나마 코드리뷰를 진행한다.

### Issue

- 현재 상황과 궁금한 것, 해결해야할 문제를 잘 정리해서 작성하기

<br>
