# nuber-eats-challenges-day18

<details>
  <summary>
  Day 15-16 정답해설
  </summary>

1. @Role
![](https://i.ibb.co/d7C3vLh/roletype.png)
- SetMetadata는 metadata를 key/value로 저장 해줍니다. 'roles'라는 key에 roles라는 변수를 값으로 metadata에 저장을 해 놓아서 어디서든 꺼내볼 수 있습니다. 물론 우리는 AuthGuard에서 꺼내봅니다.
- RoleType은 keyof typeof로 지정 해 놓을 수 있습니다.
- keyof 연산자는 피연산자의 키타입에 해당하는 타입을 리턴해줍니다.
- 이를테면, let person: Person { name: 'Jarid', age: 35} 라는 오브젝트에서 let personProp: keyof Person;으로 정의하면 personProp이 가질 수 있는 값은 Person의 key 값이 ”name”|”age”가 됩니다.
- 위 코드를 이해하시려면 먼저 Union of literal types이라는 개념을 이해하면 좋은데,
- type Greeting = 'Hello';에서 Greeting 타입은 'Hello' 하나만 가능하지만,
- type Greeting = 'Hello'|'Hi'|'Welcome'; 에서 Greeting 타입은 'Hello', 'Hi', 'Welcome' 이 세가지 값을 가질 수 있습니다.
- enum에서도 union of literal types를 이용할 수 있습니다.
- enum을 union of literal types로 만들기 위해 사용하는 것이 keyof typeof 입니다.
- 위코드에서는 추가적으로 'Any'까지 타입이 추가시켰으므로, keyof typeof UserRole | 'Any'로 사용한 것입니다.

2. APP_GUARD
- @Role 데코레이터와 @UseGuards (AuthGuard) 를 같이 계속 혼용한다고 생각하시면 어떤가요? 섹시하지 못하죠? 그래서 nestjs 에서 제공해주는 [APP_GUARD](https://docs.nestjs.kr/security/authentication) 상수를 이용해서 UseGuards사용을 줄일 수 있습니다.
![](https://i.ibb.co/sHbBv8W/app-guard.png)
- 위와 같이 auth 모듈 설정을 해주면, 더이상 UseGuard는 사용하지 않으셔도 됩니다. 대신에 Auth module을 App 모듈에서 꼭 import 해주셔야 합니다.

3. AuthGuard 수정
- 이번에는 auth.guard.ts에서 AuthGuard 수정 해야 합니다. SetMetadata로 넘겨준 'roles'라는 키를 가진 metadata를 AuthGuard가 작동할 때 값을 가져와서 role이 어떤지 확인 해야 하기 때문입니다.
![](https://i.ibb.co/TcRPbnL/new-auth-guard.png)
- AuthGuard에서 role과 관련된 부분만 보겠습니다.
- constructor에 보면 어김없이 나오는 parameter properties가 보입니다. reflector라는 property가 Reflector클래스 타입으로 설정되었습니다. 6번 라인 코드에서 SetMetadata로 넘겨준 'roles' 키에 해당하는 값을 얻어올 수 있습니다.
- 10번 라인에 보면 roles가 falsy한 값이면 AuthGuard는 true를 리턴합니다. 즉, Role을 설정 안해주면 public resolver로 취급할 수 있다는 의미입니다.
- Role 값들을 얻어 오려면 메타데이터를 설정을 해줘야 하는데, 앞에 코드처럼 우리는 @Role 데코레이터를 이용하여 설정하기로 했습니다. 사용을 할 때 원하는 resolver 위에 사용해주면 됩니다.
- ```podcast.resolver.ts```
![](https://i.ibb.co/NNthBd2/podcast-resolver.png)
- 위의 코드를 보시면 getAllPodcasts에는 @Role 이 없는데, createPodcast에는 @Role 이 있습니다. 전자는 Role이 없으므로, 우리의 AuthGuard 코드에 보면, true를 리턴하게 되므로 public한 resolver로 볼 수 있습니다. 로그인하지 않아도 팟캐스트들을 검색할 수 있습니다.
- 반면에 createPodcast를 보면 Role이 있는데 'Host'여야 한다는 의미로 AuthGuard에서 처리 해줄 수 있습니다. 로그인 하지 않거나 Listener인 유저에게 Forbidden Resource 에러가 발생하게 됩니다.


###결론
- nestjs 프레임워크에서 메타데이터를 이용하기 위한 데코레이터를 만들고, 인증 부분 수정을 하여 권한 부여 기능을 구현한 챌린지였습니다.
- user entity 만들고, 인증파트를 위해 guard, middleware도 만들었고, 암호화 기능도 구현하고, 권한부여까지 인증파트에서 여러가지를 만들었는데 거의 막바지 입니다.
</details>

### The Last Resolvers

- 오늘의 강의: 우버 이츠 클론코딩 강의 #11 (21.09.09)
- 오늘의 과제: 위의 강의를 시청하신 후, 아래 코드 챌린지를 제출하세요.

### Code Challenge

- 곧 이번 챌린지의 백엔드 작업이 끝이 납니다.
- 지금까지는 'Host'만을 위한 Resolver에 대해서 작성을 해왔습니다.
- 이번에는 'Listener'를 위한 Resolver를 작성할 차례입니다.
A listener can:

- searchPodcasts (by title)
- reviewPodcast
- subscribeToPodcast
- seeSubscriptions
- markEpisodeAsPlayed (like a Netflix movie that has been watched)
이 Resolver들을 모두 작성하세요. 내일은 마지막 백엔드 챌린지입니다!



<details>
  <summary>
  Hint
  </summary>

- Resolver 작성은 @Resolver 데코레이터를 이용하시면 됩니다. 또는 nest g r [모듈명]으로 만들 수도 있습니다.
- 기존에 작성하셨던 Podcast resolver를 참고하시면 쉽게 작성이 가능합니다.
- reviewPodcast를 작성하려면 review entity를 작성할 필요가 있습니다. episode와 user 간의 관계를 잘 생각해보시면 쉽게 entity를 작성할 수 있습니다.
- Listener Resolver를 작성할 때에는 Role base authorization을 활용하시면 됩니다.
- subscribeToPodcast, markEpisodeAsPlayed를 구현하려면 user과 podcast, episode entity에 relation 설정이 필요합니다.
</details>