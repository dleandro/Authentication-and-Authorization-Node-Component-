import React from 'react'

export default function Homepage() {

    return (<div>
        <p className="has-line-data" data-line-start={0} data-line-end={2}>
            O nosso componente node fornece uma REST API, que permite ao cliente acessar,
            visualizar e monitorizar toda a informação relativa a um utilizador que está disponível.<br/>
            Existem variados usos e implementações para esta REST API, eis alguns exemplos.</p>
        <ul>
            <li className="has-line-data" data-line-start={3} data-line-end={4}>Construção de um website que pretenda
                ser acessivel por utilizadores registados
            </li>
            <li className="has-line-data" data-line-start={4} data-line-end={5}>Desenvolvimento de uma aplicação com
                acesso a dados restrito
            </li>
            <li className="has-line-data" data-line-start={5} data-line-end={7}>Construção de uma aplicação mobile que
                procure a implementação de um sistema
                de hierarquiade utilizadores
            </li>
        </ul>
        <p className="has-line-data" data-line-start={7} data-line-end={8}>
            Este módulo providência os meios para uma gestão segura e correta de utilizadores para os propósitos de
            criação tanto de software comercial como
            de software não comercial.</p>
        <h3 className="code-line" data-line-start={9} data-line-end={10}><a id="Aplicaes_que_usam_a_API_9"/>Aplicações
            que usam a API:</h3>
        <ul>
            <li className="has-line-data" data-line-start={10} data-line-end={12}>None yet</li>
        </ul>
        <pre><code className="has-line-data" data-line-start={43} data-line-end={48}>body: {"{"}{"\n"}{"      "}username: "newName",{"\n"}{"      "}
            password: "newPass"{"\n"}{"}"}{"\n"}</code></pre>
        <h3 className="code-line" data-line-start={48} data-line-end={49}><a id="GET_httplocalhost8082userid_48"/>GET
            <a href="http://localhost:8082/user/:id">http://localhost:8082/user/:id</a></h3>
        <p className="has-line-data" data-line-start={49} data-line-end={50}>Retorna a informação(id e username)
            relativa ao
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User
            </a> especificado pelo id como parametro.</p>
        <h3 className="code-line" data-line-start={51} data-line-end={52}><a id="DELETE_httplocalhost8082userid_51"/>DELETE
            <a href="http://localhost:8082/user/:id">http://localhost:8082/user/:id</a></h3>
        <p className="has-line-data" data-line-start={52} data-line-end={53}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={54} data-line-end={55}>Apaga o
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User
            </a> especificado pelo id como parametro, da base de dados.</p>
        <h3 className="code-line" data-line-start={56} data-line-end={57}><a
            id="PUT_httplocalhost8082useridusername_56"/>PUT
            <a href="http://localhost:8082/user/:id/username">http://localhost:8082/user/:id/username</a></h3>
        <p className="has-line-data" data-line-start={57} data-line-end={58}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={59} data-line-end={60}>Altera o username do
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User
            </a> especificado pelo parametro id, com o valor de username passado no body do pedido.</p>
        <pre><code className="has-line-data" data-line-start={61} data-line-end={65}>body: {"{"}{"\n"}{"      "}username: "UpdatedName"{"\n"}{"}"}{"\n"}</code></pre>
        <h3 className="code-line" data-line-start={66} data-line-end={67}><a
            id="PUT_httplocalhost8082useridpassword_66"/>PUT
            <a href="http://localhost:8082/user/:id/password">http://localhost:8082/user/:id/password</a></h3>
        <p className="has-line-data" data-line-start={67} data-line-end={68}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={69} data-line-end={70}>Altera a password do
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User
            </a> especificado pelo parametro id, com o valor de password passado no body do pedido.</p>
        <pre><code className="has-line-data" data-line-start={71} data-line-end={75}>body: {"{"}{"\n"}{"      "}password: "UpdatedPass"{"\n"}{"}"}{"\n"}</code></pre>
        <h3 className="code-line" data-line-start={76} data-line-end={77}><a id="GET_httplocalhost8082list_76"/>GET
            <a href="http://localhost:8082/list">http://localhost:8082/list</a></h3>
        <p className="has-line-data" data-line-start={77} data-line-end={78}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={79} data-line-end={80}>Retorna o conjunto de todos os objetos
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">List</a>.
        </p>
        <h3 className="code-line" data-line-start={81} data-line-end={82}><a id="POST_httplocalhost8082list_81"/>POST
            <a href="http://localhost:8082/list">http://localhost:8082/list</a></h3>
        <p className="has-line-data" data-line-start={82} data-line-end={83}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={84} data-line-end={85}>Adiciona um novo objeto
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">List
            </a> com a informação enviada no body do pedido á base de dados.</p>
        <pre><code className="has-line-data" data-line-start={86}
                   data-line-end={94}>body: {"{"}{"\n"}{"  "}user: 6,{"\n"}{"  "}LIST: "NewList",{"\n"}{"  "}start_date:
                        "2020-04-09 02:55:05",{"\n"}{"  "}end_date: "2020-06-09 02:55:05",{"\n"}{"  "}updater: 10,{"\n"}{"}"}{"\n"}</code></pre>
        <p className="has-line-data" data-line-start={103} data-line-end={104}>Retorna a coleção de
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">Lists</a>
            que se encontram ativas no momento.</p>
        <h3 className="code-line" data-line-start={105} data-line-end={106}><a
            id="GET_httplocalhost8082listactiveuserid_105"/>GET
            <a href="http://localhost:8082/list/active/user/:id">http://localhost:8082/list/active/user/:id</a></h3>
        <p className="has-line-data" data-line-start={106} data-line-end={107}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={108} data-line-end={109}>Retorna a coleção de
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#lists">Lists
            </a> ativas relativas ao <a
                href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User
            </a> especificado no parâmetro id.</p>
        <h3 className="code-line" data-line-start={110} data-line-end={111}><a id="GET_httplocalhost8082role_110"/>GET
            <a href="http://localhost:8082/role">http://localhost:8082/role</a></h3>
        <p className="has-line-data" data-line-start={111} data-line-end={112}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={113} data-line-end={114}>Retorna o conjunto de todos os objetos
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role
            </a> presentes na base de dados.</p>
        <h3 className="code-line" data-line-start={115} data-line-end={116}><a id="POST_httplocalhost8082role_115"/>POST
            <a href="http://localhost:8082/role">http://localhost:8082/role</a></h3>
        <p className="has-line-data" data-line-start={116} data-line-end={117}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={118} data-line-end={119}>Adiciona um novo objetos
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a> na
            base de dados.</p>
        <pre><code className="has-line-data" data-line-start={120}
                   data-line-end={127}>body: {"{"}{"\n"}{"  "}role: {"{"}{"\n"}{"  "}id: 5,{"\n"}{"  "}role:
                        "admin",{"\n"}{"  "}parent_role: 2{"\n"}{"}"}{"}"}{"\n"}</code></pre>
        <h3 className="code-line" data-line-start={128} data-line-end={129}><a
            id="DELETE_httplocalhost8082roleid_128"/>DELETE <a href="http://localhost:8082/role/:id">
            http://localhost:8082/role/:id</a></h3>
        <p className="has-line-data" data-line-start={129} data-line-end={130}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={131} data-line-end={132}>Apaga o objetos
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a>
            especificado por id, da base de dados.</p>
        <h3 className="code-line" data-line-start={133} data-line-end={134}><a
            id="GET_httplocalhost8082roleid_133"/>GET <a href="http://localhost:8082/role/:id">
            http://localhost:8082/role/:id</a></h3>
        <p className="has-line-data" data-line-start={134} data-line-end={135}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={160} data-line-end={161}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={162} data-line-end={163}>Retorna a lista de
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Roles</a> do
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">User</a>
            representado por id que se encontram no estado “active”.</p>
        <h3 className="code-line" data-line-start={164} data-line-end={165}><a
            id="GET_httplocalhost8082usersrolesroleiduserid_164"/>GET
            <a href="http://localhost:8082/users-roles/:role-id/user/:id">http://localhost:8082/users-roles/:role-id/user/:id</a>
        </h3>
        <p className="has-line-data" data-line-start={165} data-line-end={166}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={167} data-line-end={168}>Retorna um
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#roles">Role</a>
            especificado por role-id do <a
                href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#user">
                User</a> representado por id.</p>
        <h3 className="code-line" data-line-start={169} data-line-end={170}><a
            id="GET_httplocalhost8082permission_169"/>GET <a href="http://localhost:8082/permission">
            http://localhost:8082/permission</a></h3>
        <p className="has-line-data" data-line-start={170} data-line-end={171}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={172} data-line-end={173}>Retorna o conjunto de todos os objetos
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#permission">Permission</a>
            presentes na base de dados.</p>
        <h3 className="code-line" data-line-start={174} data-line-end={175}><a
            id="POST_httplocalhost8082permission_174"/>POST
            <a href="http://localhost:8082/permission">http://localhost:8082/permission</a></h3>
        <p className="has-line-data" data-line-start={175} data-line-end={176}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={177} data-line-end={178}>Adiciona um novo objeto
            <a href="https://github.com/dleandro/Authentication-and-Authorization-Node-Component-/wiki/Endpoint-Documentation#permission">Permission</a>
            à base de dados.</p>
        <pre><code className="has-line-data" data-line-start={179} data-line-end={184}>body: {"{"}{"\n"}{"  "}method: "GET",{"\n"}{"  "}path:
                        "/homepage"{"\n"}{"}"}{"\n"}</code></pre>
        <h3 className="code-line" data-line-start={184} data-line-end={185}><a
            id="DELETE_httplocalhost8082permission_184"/>DELETE
            <a href="http://localhost:8082/permission">http://localhost:8082/permission</a></h3>
        <p className="has-line-data" data-line-start={185} data-line-end={186}>Disponível
            no <strong>backoffice</strong> fornecido.</p>
        <p className="has-line-data" data-line-start={187} data-line-end={188}>Apaga o objeto <a href="https://github.com/dleandro/Authentication-and-Authorization-No
                de-Component-/wiki/Endpoint-Documentation#permission">Permission</a> correspondente ao representado no
            body do pedido.</p>
        <pre><code className="has-line-data" data-line-start={189} data-line-end={194}>body: {"{"}{"\n"}{"  "}method: "GET",{"\n"}{"  "}path: "/homepage"
            {"\n"}{"}"}{"\n"}</code></pre>
        <h3 className="code-line" data-line-start={195} data-line-end={196}><a
            id="POST_httplocalhost8082rolespermission_195"/>POST <a href="http://localhost
                :8082/roles-permission">http://localhost:8082/roles-permission</a></h3>
        <pre><code className="has-line-data" data-line-start={329}
                   data-line-end={335}>roles_permission: {"{"}{"\n"}{"  "}user_id: 1,{"\n"}{"  "}DATE: "2020-
                        04-09 02:55:05",{"\n"}{"  "}description: "Login using azure idp with saml protocol"{"\n"}{"}"}{"\n"}</code></pre>
    </div>)

}

