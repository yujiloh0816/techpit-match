
This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

### 初めて知ったRuby or Railsのメソッド

http://railsdoc.com/references/content_tag
```
content_tag(タグの名前)
```

```
<%= link_to(content_tag(:i, "", class: "fas fa-cog fa-2x"), destroy_user_session_path, method: :delete) %>

=><a href="/users/edit"><i class="fas fa-edit fa-2x"></i></a>

```
