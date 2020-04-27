import React from 'react'

export default function Homepage() {

    return (<div>
            <p className="has-line-data" data-line-start={0} data-line-end={2}>O nosso componente node fornece uma REST API, que permite ao cliente acessar, visualizar e monitorizar toda a informação relativa a um utilizador que está disponível.<br />
                    Existem variados usos e implementações para esta REST API, eis alguns exemplos.</p>
            <ul>
                    <li className="has-line-data" data-line-start={3} data-line-end={4}>Construção de um website que pretenda ser acessivel por utilizadores registados</li>
                    <li className="has-line-data" data-line-start={4} data-line-end={5}>Desenvolvimento de uma aplicação com acesso a dados restrito</li>
                    <li className="has-line-data" data-line-start={5} data-line-end={7}>Construção de uma aplicação mobile que procure a implementação de um sistema de hierarquiade utilizadores</li>
            </ul>
            <p className="has-line-data" data-line-start={7} data-line-end={8}>Este módulo providência os meios para uma gestão segura e correta de utilizadores para os propósitos de criação tanto de software comercial como de software não comercial.</p>
            <h3 className="code-line" data-line-start={9} data-line-end={10}><a id="Aplicaes_que_usam_a_API_9" />Aplicações que usam a API:</h3>
            <ul>
                    <li className="has-line-data" data-line-start={10} data-line-end={12}>None yet</li>
            </ul>
            <h1 className="code-line" data-line-start={12} data-line-end={13}><a id="Detalhes_dos_Endpoint_12" />Detalhes dos Endpoint</h1>
            <p className="has-line-data" data-line-start={13} data-line-end={14}>A API está disponível em <a href="http://localhost:8082">http://localhost:8082</a></p>
            <h3 className="code-line" data-line-start={15} data-line-end={16}><a id="GET_httplocalhost8082user_15" />GET <a href="http://localhost:8082/user">http://localhost:8082/user</a></h3>
            <p className="has-line-data" data-line-start={16} data-line-end={17}>Requer: Autenticação com um dos protocolos disponíveis.</p>
            <p className="has-line-data" data-line-start={19} data-line-end={20}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={21} data-line-end={22}>Retorna a lista de todos os objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> presentes na base de dados.</p>
            <pre><code className="has-line-data" data-line-start={23} data-line-end={37}>response: [{"\n"}{"{"}{"\n"}{"  "}id: 1,{"\n"}{"  "}username: "exampleUsername1"{"\n"}{"}"},{"\n"}{"{"}{"\n"}{"  "}id: 2,{"\n"}{"  "}username: "exampleUsername2"{"\n"}{"}"},{"\n"}{"{"}{"\n"}{"  "}id: 3,{"\n"}{"  "}username: "exampleUsername3"{"\n"}{"}"}]{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={37} data-line-end={38}><a id="POST_httplocalhost8082user_37" />POST <a href="http://localhost:8082/user">http://localhost:8082/user</a></h3>
            <p className="has-line-data" data-line-start={38} data-line-end={39}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={40} data-line-end={41}>Regista um novo <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> na base de dados.</p>
            <pre><code className="has-line-data" data-line-start={43} data-line-end={48}>body: {"{"}{"\n"}{"      "}username: "newName",{"\n"}{"      "}password: "newPass"{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={48} data-line-end={49}><a id="GET_httplocalhost8082userid_48" />GET <a href="http://localhost:8082/user/:id">http://localhost:8082/user/:id</a></h3>
            <p className="has-line-data" data-line-start={49} data-line-end={50}>Retorna a informação(id e username) relativa ao <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> especificado pelo id como parametro.</p>
            <h3 className="code-line" data-line-start={51} data-line-end={52}><a id="DELETE_httplocalhost8082userid_51" />DELETE <a href="http://localhost:8082/user/:id">http://localhost:8082/user/:id</a></h3>
            <p className="has-line-data" data-line-start={52} data-line-end={53}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={54} data-line-end={55}>Apaga o <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> especificado pelo id como parametro, da base de dados.</p>
            <h3 className="code-line" data-line-start={56} data-line-end={57}><a id="PUT_httplocalhost8082useridusername_56" />PUT <a href="http://localhost:8082/user/:id/username">http://localhost:8082/user/:id/username</a></h3>
            <p className="has-line-data" data-line-start={57} data-line-end={58}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={59} data-line-end={60}>Altera o username do <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> especificado pelo parametro id, com o valor de username passado no body do pedido.</p>
            <pre><code className="has-line-data" data-line-start={61} data-line-end={65}>body: {"{"}{"\n"}{"      "}username: "UpdatedName"{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={66} data-line-end={67}><a id="PUT_httplocalhost8082useridpassword_66" />PUT <a href="http://localhost:8082/user/:id/password">http://localhost:8082/user/:id/password</a></h3>
            <p className="has-line-data" data-line-start={67} data-line-end={68}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={69} data-line-end={70}>Altera a password do <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> especificado pelo parametro id, com o valor de password passado no body do pedido.</p>
            <pre><code className="has-line-data" data-line-start={71} data-line-end={75}>body: {"{"}{"\n"}{"      "}password: "UpdatedPass"{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={76} data-line-end={77}><a id="GET_httplocalhost8082list_76" />GET <a href="http://localhost:8082/list">http://localhost:8082/list</a></h3>
            <p className="has-line-data" data-line-start={77} data-line-end={78}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={79} data-line-end={80}>Retorna o conjunto de todos os objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">List</a>.</p>
            <h3 className="code-line" data-line-start={81} data-line-end={82}><a id="POST_httplocalhost8082list_81" />POST <a href="http://localhost:8082/list">http://localhost:8082/list</a></h3>
            <p className="has-line-data" data-line-start={82} data-line-end={83}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={84} data-line-end={85}>Adiciona um novo objeto <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">List</a> com a informação enviada no body do pedido á base de dados.</p>
            <pre><code className="has-line-data" data-line-start={86} data-line-end={94}>body: {"{"}{"\n"}{"  "}user: 6,{"\n"}{"  "}LIST: "NewList",{"\n"}{"  "}start_date: "2020-04-09 02:55:05",{"\n"}{"  "}end_date: "2020-06-09 02:55:05",{"\n"}{"  "}updater: 10,{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={95} data-line-end={96}><a id="DELETE_httplocalhost8082listid_95" />DELETE <a href="http://localhost:8082/list/:id">http://localhost:8082/list/:id</a></h3>
            <p className="has-line-data" data-line-start={96} data-line-end={97}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={98} data-line-end={99}>Apaga a <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">List</a> especificada pelo parâmetro id</p>
            <h3 className="code-line" data-line-start={100} data-line-end={101}><a id="GET_httplocalhost8082listactive_100" />GET <a href="http://localhost:8082/list/active">http://localhost:8082/list/active</a></h3>
            <p className="has-line-data" data-line-start={101} data-line-end={102}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={103} data-line-end={104}>Retorna a coleção de <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">Lists</a> que se encontram ativas no momento.</p>
            <h3 className="code-line" data-line-start={105} data-line-end={106}><a id="GET_httplocalhost8082listactiveuserid_105" />GET <a href="http://localhost:8082/list/active/user/:id">http://localhost:8082/list/active/user/:id</a></h3>
            <p className="has-line-data" data-line-start={106} data-line-end={107}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={108} data-line-end={109}>Retorna a coleção de <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">Lists</a> ativas relativas ao <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> especificado no parâmetro id.</p>
            <h3 className="code-line" data-line-start={110} data-line-end={111}><a id="GET_httplocalhost8082role_110" />GET <a href="http://localhost:8082/role">http://localhost:8082/role</a></h3>
            <p className="has-line-data" data-line-start={111} data-line-end={112}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={113} data-line-end={114}>Retorna o conjunto de todos os objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> presentes na base de dados.</p>
            <h3 className="code-line" data-line-start={115} data-line-end={116}><a id="POST_httplocalhost8082role_115" />POST <a href="http://localhost:8082/role">http://localhost:8082/role</a></h3>
            <p className="has-line-data" data-line-start={116} data-line-end={117}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={118} data-line-end={119}>Adiciona um novo objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> na base de dados.</p>
            <pre><code className="has-line-data" data-line-start={120} data-line-end={127}>body: {"{"}{"\n"}{"  "}role: {"{"}{"\n"}{"  "}id: 5,{"\n"}{"  "}role: "admin",{"\n"}{"  "}parent_role: 2{"\n"}{"}"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={128} data-line-end={129}><a id="DELETE_httplocalhost8082roleid_128" />DELETE <a href="http://localhost:8082/role/:id">http://localhost:8082/role/:id</a></h3>
            <p className="has-line-data" data-line-start={129} data-line-end={130}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={131} data-line-end={132}>Apaga o objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> especificado por id, da base de dados.</p>
            <h3 className="code-line" data-line-start={133} data-line-end={134}><a id="GET_httplocalhost8082roleid_133" />GET <a href="http://localhost:8082/role/:id">http://localhost:8082/role/:id</a></h3>
            <p className="has-line-data" data-line-start={134} data-line-end={135}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={136} data-line-end={137}>Retorna o objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> especificado por id.</p>
            <h3 className="code-line" data-line-start={138} data-line-end={139}><a id="GET_httplocalhost8082usersroles_138" />GET <a href="http://localhost:8082/users-roles">http://localhost:8082/users-roles</a></h3>
            <p className="has-line-data" data-line-start={139} data-line-end={140}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={141} data-line-end={142}>Retorna o conjunto de todos os objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#users_roles">Users_Roles</a> presentes na base de dados.</p>
            <h3 className="code-line" data-line-start={143} data-line-end={144}><a id="POST_httplocalhost8082usersroles_143" />POST <a href="http://localhost:8082/users-roles">http://localhost:8082/users-roles</a></h3>
            <p className="has-line-data" data-line-start={144} data-line-end={145}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={146} data-line-end={147}>Adiciona um novo objeto <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#users_roles">Users_Roles</a> à base de dados, conectando um <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> a um <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a></p>
            <pre><code className="has-line-data" data-line-start={148} data-line-end={153}>body: {"{"}{"\n"}{"  "}user: 1,{"\n"}{"  "}role: 2{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={154} data-line-end={155}><a id="GET_httplocalhost8082usersrolesactive_154" />GET <a href="http://localhost:8082/users-roles/active">http://localhost:8082/users-roles/active</a></h3>
            <p className="has-line-data" data-line-start={155} data-line-end={156}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={157} data-line-end={158}>Retorna todos os objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#users_roles">Users_Roles</a> que se encontram no estado “active”.</p>
            <h3 className="code-line" data-line-start={159} data-line-end={160}><a id="GET_httplocalhost8082usersrolesactiveuserid_159" />GET <a href="http://localhost:8082/users-roles/active/user/:id">http://localhost:8082/users-roles/active/user/:id</a></h3>
            <p className="has-line-data" data-line-start={160} data-line-end={161}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={162} data-line-end={163}>Retorna a lista de <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Roles</a> do <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> representado por id que se encontram no estado “active”.</p>
            <h3 className="code-line" data-line-start={164} data-line-end={165}><a id="GET_httplocalhost8082usersrolesroleiduserid_164" />GET <a href="http://localhost:8082/users-roles/:role-id/user/:id">http://localhost:8082/users-roles/:role-id/user/:id</a></h3>
            <p className="has-line-data" data-line-start={165} data-line-end={166}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={167} data-line-end={168}>Retorna um <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> especificado por role-id do <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> representado por id.</p>
            <h3 className="code-line" data-line-start={169} data-line-end={170}><a id="GET_httplocalhost8082permission_169" />GET <a href="http://localhost:8082/permission">http://localhost:8082/permission</a></h3>
            <p className="has-line-data" data-line-start={170} data-line-end={171}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={172} data-line-end={173}>Retorna o conjunto de todos os objetos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#permission">Permission</a> presentes na base de dados.</p>
            <h3 className="code-line" data-line-start={174} data-line-end={175}><a id="POST_httplocalhost8082permission_174" />POST <a href="http://localhost:8082/permission">http://localhost:8082/permission</a></h3>
            <p className="has-line-data" data-line-start={175} data-line-end={176}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={177} data-line-end={178}>Adiciona um novo objeto <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#permission">Permission</a> à base de dados.</p>
            <pre><code className="has-line-data" data-line-start={179} data-line-end={184}>body: {"{"}{"\n"}{"  "}method: "GET",{"\n"}{"  "}path: "/homepage"{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={184} data-line-end={185}><a id="DELETE_httplocalhost8082permission_184" />DELETE <a href="http://localhost:8082/permission">http://localhost:8082/permission</a></h3>
            <p className="has-line-data" data-line-start={185} data-line-end={186}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={187} data-line-end={188}>Apaga o objeto <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#permission">Permission</a> correspondente ao representado no body do pedido.</p>
            <pre><code className="has-line-data" data-line-start={189} data-line-end={194}>body: {"{"}{"\n"}{"  "}method: "GET",{"\n"}{"  "}path: "/homepage"{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={195} data-line-end={196}><a id="POST_httplocalhost8082rolespermission_195" />POST <a href="http://localhost:8082/roles-permission">http://localhost:8082/roles-permission</a></h3>
            <p className="has-line-data" data-line-start={196} data-line-end={197}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={198} data-line-end={199}>Adiciona um novo objeto <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles_permission">Roles_Permission</a> à base de dados, conectando um <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> a uma <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#permission">Permission</a> .</p>
            <pre><code className="has-line-data" data-line-start={200} data-line-end={205}>body: {"{"}{"\n"}{"  "}role: 2,{"\n"}{"  "}permission: 1{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={205} data-line-end={206}><a id="DELETE_httplocalhost8082rolespermission_205" />DELETE <a href="http://localhost:8082/roles-permission">http://localhost:8082/roles-permission</a></h3>
            <p className="has-line-data" data-line-start={206} data-line-end={207}>Disponível no <strong>backoffice</strong> fornecido.</p>
            <p className="has-line-data" data-line-start={208} data-line-end={209}>Remove uma <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#permission">Permission</a> da lista de permissões de um <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a>.</p>
            <pre><code className="has-line-data" data-line-start={210} data-line-end={215}>body: {"{"}{"\n"}{"  "}role: 2,{"\n"}{"  "}permission: 1{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={216} data-line-end={217}><a id="GET_httplocalhost8082authenticationlogingoogle_216" />GET <a href="http://localhost:8082/authentication/login/google">http://localhost:8082/authentication/login/google</a></h3>
            <p className="has-line-data" data-line-start={217} data-line-end={218}>Endpoint de redirect após login pela google</p>
            <h3 className="code-line" data-line-start={219} data-line-end={220}><a id="GET_httplocalhost8082authenticationloginsaml_219" />GET <a href="http://localhost:8082/authentication/login/saml">http://localhost:8082/authentication/login/saml</a></h3>
            <p className="has-line-data" data-line-start={220} data-line-end={221}>Endpoint para efetuar autenticação SAML</p>
            <h3 className="code-line" data-line-start={222} data-line-end={223}><a id="GET_httplocalhost8082authenticationloginazureAD_222" />GET <a href="http://localhost:8082/authentication/login/azureAD">http://localhost:8082/authentication/login/azureAD</a></h3>
            <p className="has-line-data" data-line-start={223} data-line-end={224}>Endpoint para efetuar login pelo idp da Azure</p>
            <h3 className="code-line" data-line-start={225} data-line-end={226}><a id="POST_httplocalhost8082authenticationlogin_225" />POST <a href="http://localhost:8082/authentication/login">http://localhost:8082/authentication/login</a></h3>
            <p className="has-line-data" data-line-start={226} data-line-end={227}>Endpoint para efetuar login normal</p>
            <h3 className="code-line" data-line-start={228} data-line-end={229}><a id="POST_httplocalhost8082authenticationlogout_228" />POST <a href="http://localhost:8082/authentication/logout">http://localhost:8082/authentication/logout</a></h3>
            <p className="has-line-data" data-line-start={229} data-line-end={230}>Endpoint para efetuar logout.</p>
            <p className="has-line-data" data-line-start={231} data-line-end={233}>//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////<br />
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
            <h1 className="code-line" data-line-start={233} data-line-end={234}><a id="Em_Desenvolvimento_233" />Em Desenvolvimento</h1>
            <ul>
                    <li className="has-line-data" data-line-start={235} data-line-end={236}><a href="http://localhost:8082/config/google">http://localhost:8082/config/google</a></li>
                    <li className="has-line-data" data-line-start={236} data-line-end={237}><a href="http://localhost:8082/config/azureAD">http://localhost:8082/config/azureAD</a></li>
                    <li className="has-line-data" data-line-start={237} data-line-end={238}><a href="http://localhost:8082/config/database">http://localhost:8082/config/database</a></li>
                    <li className="has-line-data" data-line-start={238} data-line-end={239}><a href="http://localhost:8082/change-user-status">http://localhost:8082/change-user-status</a></li>
                    <li className="has-line-data" data-line-start={239} data-line-end={241}><a href="http://localhost:8082/user-history">http://localhost:8082/user-history</a></li>
            </ul>
            <p className="has-line-data" data-line-start={241} data-line-end={242}>//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////</p>
            <hr />
            <h2 className="code-line" data-line-start={245} data-line-end={246}><a id="Objetos_da_API_e_Estrutura_de_dados_245" />Objetos da API e Estrutura de dados</h2>
            <ul>
                    <li className="has-line-data" data-line-start={246} data-line-end={248}>Esta API implementa um modelo de dados relacional em mariaDB, como tal, a base de dados cumpre a seguinte estrutura:</li>
            </ul>
            <h3 className="code-line" data-line-start={248} data-line-end={249}><a id="User_248" />User</h3>
            <ul>
                    <li className="has-line-data" data-line-start={249} data-line-end={250}>Descreve um utilizador registado na aplicação</li>
            </ul>
            <pre><code className="has-line-data" data-line-start={251} data-line-end={257}>user: {"{"}{"\n"}{"  "}id: 3,{"\n"}{"  "}username: "exampleUsername",{"\n"}{"  "}password: "examplepass"{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={257} data-line-end={258}><a id="Lists_257" />Lists</h3>
            <ul>
                    <li className="has-line-data" data-line-start={258} data-line-end={259}>Descreve as listas a que um determinado utilizador pode ser sancionado</li>
            </ul>
            <pre><code className="has-line-data" data-line-start={260} data-line-end={270}>lists: {"{"}{"\n"}{"  "}id: 2,{"\n"}{"  "}user_id: 6,{"\n"}{"  "}LIST: "BlackList",{"\n"}{"  "}start_date: "2020-04-09 02:55:05",{"\n"}{"  "}end_date: "2020-06-09 02:55:05",{"\n"}{"  "}updater: 10,{"\n"}{"  "}password: 1{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={270} data-line-end={271}><a id="Roles_270" />Roles</h3>
            <ul>
                    <li className="has-line-data" data-line-start={271} data-line-end={272}>Representa os vários cargos que podem ser atribuídos a um utilizador, os roles seguem uma estrutura hierárquica sendo assim passível de representar em forma de árvore.</li>
            </ul>
            <pre><code className="has-line-data" data-line-start={273} data-line-end={283}>roles: [{"{"}{"\n"}{"  "}id: 2,{"\n"}{"  "}role: "developer",{"\n"}{"  "}parent_role: "1"{"\n"}{"}"},{"{"}{"\n"}{"  "}id: 1,{"\n"}{"  "}role: "admin",{"\n"}{"  "}parent_role: NULL{"\n"}{"}"}]{"\n"}</code></pre>
            <p className="has-line-data" data-line-start={283} data-line-end={284}>Tal como está demonstrado no código acima o role “developer” é um filho do role “admin”, ou seja, o cargo “admin” terá sempre as permissões que o cargo  “developer” tem, mais outras permissões exclusivas de “admin”.</p>
            <h3 className="code-line" data-line-start={285} data-line-end={286}><a id="Users_Roles_285" />Users_Roles</h3>
            <ul>
                    <li className="has-line-data" data-line-start={286} data-line-end={287}>Representa a ligação entre <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a> e <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Roles</a>, demonstrando o <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> de cada <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a>.</li>
            </ul>
            <pre><code className="has-line-data" data-line-start={288} data-line-end={298}>users_roles: {"{"}{"\n"}{"  "}id: 2,{"\n"}{"  "}user_id: 1,{"\n"}{"  "}role_id: 2,{"\n"}{"  "}start_date: "2020-04-09 02:55:05",{"\n"}{"  "}end_date: NULL,{"\n"}{"  "}updater: "developer"10,{"\n"}{"  "}active: "1"{"\n"}{"}"}{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={299} data-line-end={300}><a id="Permission_299" />Permission</h3>
            <ul>
                    <li className="has-line-data" data-line-start={300} data-line-end={301}>Descreve os endpoints da API que precisam de permissões para serem acedidos</li>
            </ul>
            <pre><code className="has-line-data" data-line-start={302} data-line-end={312}>permission: [{"{"}{"\n"}{"  "}id: 2,{"\n"}{"  "}method: "POST",{"\n"}{"  "}path: "/backoffice"{"\n"}{"}"},{"{"}{"\n"}{"  "}id: 1,{"\n"}{"  "}method: "GET",{"\n"}{"  "}path: "/backoffice"{"\n"}{"}"}]{"\n"}</code></pre>
            <h3 className="code-line" data-line-start={313} data-line-end={314}><a id="Roles_Permission_313" />Roles_Permission</h3>
            <ul>
                    <li className="has-line-data" data-line-start={314} data-line-end={315}>Indica quais roles tem acesso a quais endpoints</li>
            </ul>
            <pre><code className="has-line-data" data-line-start={316} data-line-end={324}>roles_permission: [{"{"}{"\n"}{"  "}role: 1,{"\n"}{"  "}permission: 1{"\n"}{"}"},{"{"}{"\n"}{"  "}role: 1,{"\n"}{"  "}permission: 2{"\n"}{"}"}]{"\n"}</code></pre>
            <p className="has-line-data" data-line-start={324} data-line-end={325}>No exemplo representado acima o <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> com o id 1 (“admin”) tem permissões para aceder aos endpoints GET “/backoffice” e POST “/backoffice”</p>
            <h3 className="code-line" data-line-start={326} data-line-end={327}><a id="Users_History_326" />Users_History</h3>
            <ul>
                    <li className="has-line-data" data-line-start={327} data-line-end={328}>Registo de todos os logins dos <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">Users</a></li>
            </ul>
            <pre><code className="has-line-data" data-line-start={329} data-line-end={335}>roles_permission: {"{"}{"\n"}{"  "}user_id: 1,{"\n"}{"  "}DATE: "2020-04-09 02:55:05",{"\n"}{"  "}description: "Login using azure idp with saml protocol"{"\n"}{"}"}{"\n"}</code></pre>
    </div>)

}

