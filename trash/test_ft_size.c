#include <stdlib.h>
#include <assert.h>

typedef struct s_list {
    void * data;
    struct s_list * next;
} t_list;


int ft_lists_size(t_list * head);
void test_simple_case();

int main(void){
    test_simple_case();
}

void test_simple_case(){
    int data1 = 1, data2 = 2, data3 = 3;
    t_list node1;
    node1.data = &data1;
    t_list node2;
    node2.data = &data2;
    t_list node3;
    node3.data = &data3;

    node1.next = &node2;
    node2.next = &node3;
    node3.next = NULL;

    t_list * head = &node1;

    assert(ft_lists_size(head) == 3);

    // add an element at the end
    t_list node4;
    node4.data = &data3;
    node4.next = NULL;
    node3.next = &node4;
    assert(ft_lists_size(head) == 4);

    // remove an element in the middle
    node2.next = &node4;
    assert(ft_lists_size(head) == 3);

    // remove an element at the beginning
    head = &node2;
    assert(ft_lists_size(head) == 2);
}

void test_empty_list(){
    t_list * head = NULL;
    assert(ft_lists_size(head) == 0);
}