<template>
    <div class="ccs-app">
      <Header/>
        <Nav/>
      <section>
      <div class="banner">
       <Banner/>
      </div>
      </section>
      <Footer/>
    </div>
</template>
<script>
import Header from './components/header';
import Nav from './components/nav';
import Footer from './components/footer';
import Banner from './components/banner';
export default {
    name:'cssLog',
    components:{
        Header,
        Nav,
        Footer,
        Banner
    }
}
</script>